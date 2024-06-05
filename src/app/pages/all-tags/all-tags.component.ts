import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ThemePalette } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { LittleTaskComponent } from '../../components/tasks/little-task/little-task.component';
import {
  WeekdayComponent,
  toEmit,
} from '../../components/tasks/weekday/weekday.component';
import { ITag, ITask } from '../../models/task.models';
import { StorageService } from '../../services/storage/storage.service';
import { TagService } from '../../services/tag/tag.service';
import { DateService } from '../../utils/date/date.service';

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
    WeekdayComponent,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './all-tags.component.html',
  styleUrl: './all-tags.component.scss',
})
export class AllTagsComponent implements OnInit {
  allTags: ITag[] = [];
  allTasks: ITask[] = [];
  origin: ITask[] = [];
  userId = 0;
  currentDate = 0;
  dayAsCenter = 0;
  date = new Date();
  currentMonth = this.date.getMonth();
  currentYear = this.date.getFullYear();
  numDays = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
  items = Array(this.numDays);

  @ViewChildren('weekday') weekdays?: QueryList<WeekdayComponent>;

  allComplete: boolean = false;
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

  filterTasks(array: ITask[]) {
    const ifDone = this.task.subtasks?.find((t) => t.done)?.completed;
    const ifTodo = this.task.subtasks?.find((t) => !t.done)?.completed;
    return array.filter(
      (x) => (x.taskDone && ifDone) || (!x.taskDone && ifTodo)
    );
  }

  constructor(
    private _storageService: StorageService,
    private _tagService: TagService,
    private _dateService: DateService
  ) {
    this.userId = this._storageService.getUser().id;
    this.getTags();
    this.getTaskByMonth();
  }

  ngOnInit(): void {
    this.currentDate = this.date.getDate() - 1; // no recuerdo pq le restabamos 1
    this.dayAsCenter = this.currentDate;
  }

  ngAfterViewInit(): void {
    this.weekdays?.get(this.dayAsCenter)?.scrollIntoView();
  }

  getTaskByMonth() {
    this._dateService.getTaskByMonthDay(2024, 5).subscribe({
      next: (data) => {
        this.allTasks = data as ITask[];
        this.origin = data as ITask[];
      },
      error: (error) => {
        console.error('Error de conexión al servidor.', error);
      },
    });
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

  filterByDay(day: number): ITask[] {
    let tasks = this.allTasks?.filter(
      (task) =>
        task.deadLine.substring(8, 10) ==
        day.toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })
    );

    return this.filterTasks(tasks);
  }

  addTaskToArray(info: toEmit) {
    this.allTasks.push(info.task);
  }

  updateTask(info: toEmit) {
    let index = this.allTasks.findIndex((x) => x.id == info.task.id);
    if (index > -1) {
      this.allTasks[index] = info.task;
    }
  }

  deleteTask(info: toEmit) {
    let index = this.allTasks.findIndex((x) => x.id == info.task.id);
    if (index > -1) {
      this.allTasks.splice(index, 1);
    }
  }

  centerDay(day: number) {
    console.log('inicio centerday', day);
    this.dayAsCenter = day;
    this.weekdays?.get(this.dayAsCenter)?.scrollIntoView();
    if (this.dayAsCenter == 0) {
      // TODO hay que comprobar que hacer con los extremos
    }
  }
}
