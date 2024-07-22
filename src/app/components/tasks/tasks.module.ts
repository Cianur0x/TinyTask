import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeekdayComponent } from './weekday/weekday.component';
import { AddTaskDialogComponent } from './add-task-dialog/add-task-dialog.component';
import { AddFriendDialogComponent } from './add-friend-dialog/add-friend-dialog.component';
import { LittleTaskComponent } from './little-task/little-task.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    WeekdayComponent,
    AddTaskDialogComponent,
    AddFriendDialogComponent,
    LittleTaskComponent,
  ],
  exports: [
    WeekdayComponent,
    AddTaskDialogComponent,
    AddFriendDialogComponent,
    LittleTaskComponent,
  ],
})
export class TasksModule {}
