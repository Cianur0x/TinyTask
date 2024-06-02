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
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

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
      console.log('to Emit', this.info);

      if (!!this.info) {
        if (result.operacion.localeCompare('delete') == 0) {
          this.deleteTask.emit(this.info);
        } else if (result.operacion.localeCompare('put') == 0) {
          this.updateTask.emit(this.info);
        } else {
          console.log('info', this.info);
        }
      }
    });
  }
}
