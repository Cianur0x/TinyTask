import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
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

export interface DialogData {
  animal: string;
  name: string;
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
export class AddTaskDialogComponent {
  taskForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private _formBuilder: FormBuilder,
    private _storageService: StorageService,
    private _taskService: TaskService
  ) {
    dialogRef.disableClose = true;

    this.taskForm = this._formBuilder.group({
      taskName: ['', Validators.required],
      date: [this.getAtualDateFormat(), Validators.required],
      isDone: [false, Validators.required],
      tag: ['', Validators.required],
      duration: ['', Validators.required],
      time: this._formBuilder.group({
        startTime: ['', Validators.required],
        endingTime: ['', Validators.required],
      }),
      taskDescription: ['', Validators.required],
    });
  }

  /**
   * se llama al backend para añadir una tarea
   */
  addTask() {
    this.dialogRef.close();
    console.log(this.taskForm.value);

    // // "yyyy-MM-dd@HH:mm:ss"

    // let userID = this._storageService.getUser().id;
    // let task: ITask = {
    //   title: 'string',
    //   taskDone: false,
    //   taskDuration: 'string',
    //   deadLine: deadline,
    //   description: 'string',
    //   user: {
    //     id: userID,
    //   },
    // };

    // this._taskService.postTask(task).subscribe({
    //   next: (data) => {
    //     console.log('se ha agragado');
    //   },
    //   error: (err) => {
    //     console.log('ERROR');
    //   },
    // });
  }
  deleteTask() {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  getAtualDateFormat() {
    let date = new Date();
    let year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    let month = new Intl.DateTimeFormat('en', { month: 'numeric' }).format(
      date
    );
    let day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
    let deadline = `${year}-${month}-${day}@${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return deadline;
  }
}
