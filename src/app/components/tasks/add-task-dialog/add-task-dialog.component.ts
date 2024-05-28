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
import { ITag, ITask } from '../../../models/task.models';
import { StorageService } from '../../../services/storage/storage.service';
import { TagService } from '../../../services/tag/tag.service';
import { TaskService } from '../../../services/task/task.service';

export interface DialogData {
  currentDay: number;
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
  aviso = '';
  date = new Date();
  day = 0;
  currentTime = this.date.toString().substring(16, 21);
  currentTimePlus = this.addHours(1);
  currentTask!: ITask;
  deleteTask: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _formBuilder: FormBuilder,
    private _storageService: StorageService,
    private _taskService: TaskService,
    private _tagService: TagService
  ) {
    dialogRef.disableClose = true; // para que al dar click fuera del dialogo no se cierre
    this.day = data.currentDay;
    this.currentTask = data.task;
    this.getTags(); // se cargan las etiquetas
    if (!!this.currentTask) {
      this.taskForm = this._formBuilder.group({
        title: [this.currentTask.title, Validators.required],
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
    } else {
      //inicializacion del formulario en caso de que no haya objeto
      this.taskForm = this._formBuilder.group({
        // se inicializa la tarea en el formulario
        title: ['', Validators.required],
        date: [this.date, Validators.required],
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
    let userID = this._storageService.getUser().id;
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
    };

    this._taskService.postTask(task).subscribe({
      next: (data) => {
        this.dialogRef.close({
          task: data,
          operacion: 'post',
        });
      },
      error: (err) => {
        console.log('task NO enviada');
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
    let userID = this._storageService.getUser().id;
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
    };

    this._taskService.updateTask(task).subscribe({
      next: (data) => {
        this.dialogRef.close({
          task: data,
          operacion: 'put',
        });
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
        this.dialogRef.close({
          task: this.currentTask,
          operacion: 'delete',
        });
      },
      error: (err) => {
        console.log('task NO borrada');
      },
    });
  }

  getTags() {
    let id = this._storageService.getUser().id;
    this._tagService.getAllTags(id).subscribe({
      next: (data) => {
        this.allTags = data as ITag[];
      },
      error: (error) => {
        this.setAviso('Error de conexión al servidor.');
      },
    });
  }

  setAviso(texto: string) {
    this.aviso = texto;
    setTimeout(() => (this.aviso = ''), 2000);
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
}
