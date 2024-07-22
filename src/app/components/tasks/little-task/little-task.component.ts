import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITask } from '../../../models/task.models';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgClass, NgIf } from '@angular/common';
import { AddTaskDialogComponent } from '../add-task-dialog/add-task-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { toEmit } from '../weekday/weekday.component';
import { TaskService } from '../../../services/task/task.service';
import { StorageService } from '../../../services/storage/storage.service';

@Component({
  selector: 'app-little-task',
  standalone: true,
  imports: [
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    NgClass,
    AddTaskDialogComponent,
  ],
  templateUrl: './little-task.component.html',
  styleUrl: './little-task.component.scss',
})
export class LittleTaskComponent implements OnInit {
  hideRequiredControl = new FormControl('');
  @Input() task!: ITask;
  info!: toEmit;
  @Output() updateTask = new EventEmitter<toEmit>();
  @Output() deleteTask = new EventEmitter<toEmit>();
  constructor(
    public dialog: MatDialog,
    private _taskService: TaskService,
    private _storageService: StorageService
  ) {}

  ngOnInit(): void {}

  toggleDone($event: MouseEvent) {
    const user = this._storageService.getUser();
    $event.preventDefault();
    $event.stopPropagation();
    this.info = {
      task: {
        ...this.task,
        taskDone: !this.task.taskDone,
        user: {
          id: user.id,
        },
      },
      operation: 'put',
    };
    this._taskService.updateTask(this.info.task).subscribe({
      next: (data) => {
        this.updateTask.emit(this.info);
      },
      error: (err) => {},
    });
  }
  /**
   * función para abrir el diálogo donde se creará la tarea
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(AddTaskDialogComponent, {
      data: {
        task: this.task,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.info = result;

      if (!!this.info) {
        if (result.operation.localeCompare('delete') == 0) {
          this.deleteTask.emit(this.info);
        } else if (result.operation.localeCompare('put') == 0) {
          this.updateTask.emit(this.info);
        } else {
        }
      }
    });
  }
}
