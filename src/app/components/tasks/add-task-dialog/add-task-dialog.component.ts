import { NgFor, NgIf } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faTrashCan,
  faUserCircle,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { IFriend } from '../../../models/friend.models';
import { ITag, ITask } from '../../../models/task.models';
import { StorageService } from '../../../services/storage/storage.service';
import { TagService } from '../../../services/tag/tag.service';
import { TaskService } from '../../../services/task/task.service';
import { UserService } from '../../../services/user/user.service';
import {
  AddFriendDialogComponent,
  IFriendToInvite,
} from '../add-friend-dialog/add-friend-dialog.component';
import { ControlValueAccessor } from '@angular/forms';

export interface DialogData {
  currentDay: number;
  currentMonth: number;
  currentYear: number;
  task: ITask;
}

@Component({
  selector: 'app-add-task-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule, // para que funcione forms group en el html
    MatIcon,
    MatCheckboxModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    FontAwesomeModule,
    NgFor,
    NgIf,
  ],
  templateUrl: './add-task-dialog.component.html',
  styleUrl: './add-task-dialog.component.scss',
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
})
export class AddTaskDialogComponent implements OnInit {
  hideRequiredControl = new FormControl('');
  taskForm!: FormGroup;
  allTags: ITag[] = [];
  date = new Date();
  day = 0;
  currentTime = this.date.toString().substring(16, 21);
  currentTimePlus = this.addHours(1);
  currentTask!: ITask;
  deleteTask: boolean = false;
  faShare = faUserPlus;
  faUser = faUserCircle;
  faDelete = faTrashCan;
  friendList!: IFriend[];
  user = this._storageService.getUser();
  viewersList!: IFriendToInvite[];
  weekdayDate!: Date;

  constructor(
    public dialogRef: MatDialogRef<AddTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _formBuilder: FormBuilder,
    private _storageService: StorageService,
    private _taskService: TaskService,
    private _tagService: TagService,
    private _userService: UserService,
    public dialog: MatDialog
  ) {
    dialogRef.disableClose = true; // para que al dar click fuera del dialogo no se cierre
    this.day = data.currentDay;
    this.weekdayDate = new Date(
      data.currentYear,
      data.currentMonth,
      data.currentDay
    );
    this.currentTask = data.task;
    this.getTags(); // se cargan las etiquetas
    this.getFriendsList(); // se cargan los amigos
    if (!!this.currentTask) {
      this.taskForm = this._formBuilder.group({
        title: [
          this.currentTask.title,
          [Validators.required, Validators.maxLength(90)],
        ],
        date: [new Date(this.currentTask.deadLine), Validators.required],
        isDone: [this.currentTask.taskDone, Validators.required],
        tag: [this.currentTask.tag.id, Validators.required],
        duration: [this.currentTask.taskDuration, Validators.required],
        time: this._formBuilder.group({
          startTime: [this.currentTask.startTime, Validators.required],
          endingTime: [this.currentTask.endingTime, Validators.required],
        }),
        taskDescription: [this.currentTask.description, Validators.required],
      });
      this.viewersList = this.currentTask.viewers.map((x) => ({
        ...x,
        checked: true,
      }));
    } else {
      //inicializacion del formulario en caso de que no haya objeto
      this.taskForm = this._formBuilder.group({
        // se inicializa la tarea en el formulario
        title: ['', [Validators.required, Validators.maxLength(90)]],
        date: [this.weekdayDate, Validators.required],
        isDone: [false, Validators.required],
        tag: [1, Validators.required],
        duration: ['', Validators.required],
        time: this._formBuilder.group({
          startTime: [this.currentTime, Validators.required],
          endingTime: [this.currentTimePlus, Validators.required],
        }),
        taskDescription: ['', Validators.required],
      });
    }
  }

  ngOnInit(): void {}

  /**
   * se llama al backend para añadir una tarea
   */
  addTask() {
    let userID = this.user.id;
    const formValues = this.taskForm.value;
    let tag = this.getTagFromID(+formValues.tag);

    const task: ITask = {
      id: 0,
      title: formValues.title,
      taskDone: formValues.isDone,
      taskDuration: formValues.duration,
      deadLine: this.getCurrentDateFormat(formValues.date),
      startTime: formValues.time.startTime,
      endingTime: formValues.time.endingTime,
      description: formValues.taskDescription,
      tag: {
        id: +formValues.tag,
        name: tag.name,
        labelColor: tag.labelColor,
      },
      user: {
        id: userID,
      },

      viewers: this.viewersList,
    };

    this._taskService.postTask(task).subscribe({
      next: (data) => {
        console.log('post close');
        this.dialogRef.close({
          task: data,
          operation: 'post',
        });

        if (this.friendList.length > 0 && this.viewersList.length > 0) {
          let tarea = data as ITask;
          this._taskService.addViewers(this.viewersList, tarea.id).subscribe({
            next: (data) => {
              console.log('addviewers data', data);
              // this.dialogRef.close({ // todo aqui flata toda la operacion de hacer visibles  alos usuarios que vena la tarea
              //   task: data,
              //   operation: 'put',
              // });
            },
            error: (err) => {
              console.log('task NO actualizada');
            },
          });
        }
      },
      error: (err) => {
        console.log('task NO enviada', err);
      },
    });
  }

  /**
   * AQUI SE HACE LA PEDITION YA SEA DE BORRADO ACTULIZADO O DE CREAR
   * TODOS LOS METODOS DEBEN ESTAR METIDOS AQUI, ALA HACER CLIK SE LLAMA A ESTE METODO
   * SEGUN CONDICIONES SE HACEN LAS OPERACIONES CRUD
   */
  onSubmit() {
    if (this.deleteTask) {
      this.removeTask();
    } else {
      if (!!this.currentTask) {
        this.updateTask(this.taskForm);
      } else {
        this.addTask();
      }
    }
  }

  updateTask(form: FormGroup) {
    let userID = this.user.id;
    const formValues = form.value;

    let tag = this.getTagFromID(+formValues.tag);

    const task: ITask = {
      id: this.currentTask.id,
      title: formValues.title,
      taskDone: formValues.isDone,
      taskDuration: formValues.duration,
      deadLine: this.getCurrentDateFormat(formValues.date),
      startTime: formValues.time.startTime,
      endingTime: formValues.time.endingTime,
      description: formValues.taskDescription,
      tag: {
        id: +formValues.tag,
        name: tag.name,
        labelColor: tag.labelColor,
      },

      user: {
        id: userID,
      },

      viewers: this.viewersList,
    };

    this._taskService.updateTask(task).subscribe({
      next: (data) => {
        console.log('before close update:', data);
        this.dialogRef.close({
          task: data,
          operation: 'put',
        });

        if (this.friendList.length > 0 && this.viewersList.length > 0) {
          this._taskService.addViewers(this.viewersList, task.id).subscribe({
            next: (data) => {
              this.currentTask.viewers = data as IFriend[];
              console.log('addviewers data', data);
            },
            error: (err) => {
              console.log('task NO actualizada');
            },
          });
        }
      },
      error: (err) => {
        console.log('task NO actualizada');
      },
    });
  }

  getCurrentDateFormat(fechaRecibida: Date) {
    let dia = fechaRecibida.getDate();
    let mes = fechaRecibida.getMonth();
    let year = fechaRecibida.getFullYear();
    let fecha = new Date(year, mes, dia);
    let deadline = fecha.toLocaleDateString('en-CA', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });

    return deadline;
  }

  removeTask() {
    this._taskService.deleteTask(this.currentTask.id).subscribe({
      next: () => {
        console.log('delete close');
        this.dialogRef.close({
          task: this.currentTask,
          operation: 'delete',
        });
      },
      error: (err) => {
        console.log('task NO borrada');
      },
    });
  }

  getTags() {
    let id = this.user.id;
    this._tagService.getAllTags(id).subscribe({
      next: (data) => {
        this.allTags = data as ITag[];
      },
      error: (error) => {
        console.error('Error de conexión al servidor.', error);
      },
    });
  }

  addHours(h: number) {
    let milliseconds = this.date.setTime(
      this.date.getTime() + h * 60 * 60 * 1000
    );
    let later = new Date(milliseconds);

    return later.toString().substring(16, 21);
  }

  getTagFromID(id: number) {
    let soloTag = this.allTags.filter((x) => x.id == id);
    return soloTag[0];
  }

  getFriendsList() {
    this._userService.getFriendsList(this.user.id).subscribe({
      next: (data) => {
        this.friendList = data as IFriend[];
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  /**
   * función para abrir el diálogo donde se creará la tarea
   */
  openDialog3(): void {
    const dialogRef = this.dialog.open(AddFriendDialogComponent, {
      data: { friendList: this.friendList, viewersList: this.viewersList },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!!result) {
        this.viewersList = result.friendList as IFriendToInvite[];
        this.viewersList = this.viewersList.filter((x) => x.checked);
      }
    });
  }
}
