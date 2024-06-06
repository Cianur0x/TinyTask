import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ThemePalette } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { LittleTaskComponent } from '../../components/tasks/little-task/little-task.component';
import { ITag, ITask } from '../../models/task.models';
import { StorageService } from '../../services/storage/storage.service';
import { TagService } from '../../services/tag/tag.service';
import { TaskService } from '../../services/task/task.service';
import { InicioGeneralComponent } from '../inicio-general/inicio-general.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
export interface checkBox {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: checkBox[];
  done: boolean;
}

@Component({
  selector: 'app-all-tags',
  standalone: true,
  imports: [
    NgFor,
    MatCheckboxModule,
    LittleTaskComponent,
    NgIf,
    FormsModule,
    MatDividerModule,
    InicioGeneralComponent,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
  ],
  templateUrl: './all-tags.component.html',
  styleUrl: './all-tags.component.scss',
})
export class AllTagsComponent {
  allTags: ITag[] = [];
  aviso = '';
  userId = 0;
  currentDate = new Date();
  allTasks: ITask[] = [];
  filteredTasks: ITask[] = [];
  origin: ITask[] = [];
  allComplete: boolean = false;
  date = new Date();
  currentMonth = this.date.getMonth();
  currentYear = this.date.getFullYear();

  task: checkBox = {
    name: 'All',
    completed: false,
    color: 'accent',
    done: false,
    subtasks: [
      { name: 'To do', completed: false, color: 'primary', done: false },
      { name: 'Done', completed: false, color: 'primary', done: true },
    ],
  };

  updateAllComplete() {
    console.log('update all');
    this.allComplete =
      this.task.subtasks != null &&
      this.task.subtasks.every((t) => t.completed);
  }

  someComplete(): boolean {
    if (this.task.subtasks == null) {
      return false;
    }
    return (
      this.task.subtasks.filter((t) => t.completed).length > 0 &&
      !this.allComplete
    );
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.task.subtasks == null) {
      return;
    }
    this.task.subtasks.forEach((t) => (t.completed = completed));
  }

  filterTasks() {
    const ifDone = this.task.subtasks?.find((t) => t.done)?.completed;
    const ifTodo = this.task.subtasks?.find((t) => !t.done)?.completed;
    return this.allTasks.filter(
      (x) => (x.taskDone && ifDone) || (!x.taskDone && ifTodo)
    );
  }

  getTaskByMonthDay(year: number, month: number) {
    var firstDay = new Date(year, month, 1);
    var lastDay = new Date(year, month + 1, 0);
    var start = this.customFormatToDB(firstDay);
    var end = this.customFormatToDB(lastDay);

    this._taskService.getTasksByMonth(start, end, this.userId).subscribe({
      next: (data) => {
        this.allTasks = data as ITask[];
        this.origin = data as ITask[];
      },
      error: (error) => {
        console.log('Error de conexión al servidor.');
      },
    });
  }

  customFormatToDB(date: Date): string {
    let fecha = date.toLocaleDateString('en-CA', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });

    return fecha;
  }

  ///////
  constructor(
    private _storageService: StorageService,
    private _tagService: TagService,
    private _taskService: TaskService
  ) {
    this.userId = this._storageService.getUser().id;
    this.getTags();
    this.getTaskByMonthDay(2024, 4);
  }

  getTags() {
    this._tagService.getAllTags(this.userId).subscribe({
      next: (data) => {
        this.allTags = data as ITag[];
      },
      error: (error) => {
        console.error('Error de conexión al servidor.', error);
      },
    });
  }

  filterTaskByTag(id: number) {
    this.allTasks = this.origin.filter((x) => x.tag.id == id);
  }

  updateTask() {}
  deleteTask() {}
}
