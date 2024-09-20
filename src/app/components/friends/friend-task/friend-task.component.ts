import { NgIf, NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ITask } from '../../../models/task.models';

@Component({
  selector: 'app-friend-task',
  standalone: true,
  imports: [
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    NgClass,
  ],
  templateUrl: './friend-task.component.html',
  styleUrl: './friend-task.component.scss',
})
export class FriendTaskComponent {
  @Input() task!: ITask;
}
