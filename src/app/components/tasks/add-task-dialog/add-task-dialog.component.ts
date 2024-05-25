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
import { StorageService } from '../../../services/storage/storage.service';
import { TaskService } from '../../../services/task/task.service';
import { ITag, ITask } from '../../../models/task.models';
import { TagService } from '../../../services/tag/tag.service';

export interface DialogData {
  currentDay: 0;
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
  constructor(
    public dialogRef: MatDialogRef<AddTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _formBuilder: FormBuilder,
    private _storageService: StorageService,
    private _taskService: TaskService,
    private _tagService: TagService
  ) {
    this.day = data.currentDay;
    dialogRef.disableClose = true; // para que al dar click fuera del dialogo no se cierre
    this.getTags(); // se cargan las etiquetas
    this.taskForm = this._formBuilder.group({
      title: ['', Validators.required],
      date: [this.date, Validators.required],
      isDone: [false, Validators.required],
      tag: [1, Validators.required],
      duration: ['', Validators.required],
      time: this._formBuilder.group({
        startTime: ['', Validators.required],
        endingTime: ['', Validators.required],
      }),
      taskDescription: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  /**
   * se llama al backend para añadir una tarea
   */
  addTask() {
    console.log(this.taskForm.value);
    let userID = this._storageService.getUser().id;

    const formValues = this.taskForm.value;

    const task: ITask = {
      title: formValues.title,
      taskDone: formValues.isDone,
      taskDuration: formValues.duration,
      deadLine: this.getCurrentDateFormat(formValues.date),
      startTime: formValues.time.startTime,
      endingTime: formValues.time.endingTime,
      description: formValues.taskDescription,
      tag: {
        id: +formValues.tag,
      },

      user: {
        id: userID,
      },
    };

    this._taskService.postTask(task).subscribe({
      next: (data) => {
        console.log('task enviada', task);
        console.log('se ha agregado');
      },
      error: (err) => {
        console.log('ERROR');
      },
    });

    this.dialogRef.close();
  }

  deleteTask() {}

  getCurrentDateFormat(date: Date) {
    let dia = this.day;
    let mes = date.getUTCMonth();
    let year = date.getUTCFullYear();
    let fecha = new Date(Date.UTC(year, mes, dia));
    console.log(dia);
    let deadline = fecha.toLocaleDateString('en-CA', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });

    console.log('get actual date format para deadeline', deadline);
    return deadline;
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
}
