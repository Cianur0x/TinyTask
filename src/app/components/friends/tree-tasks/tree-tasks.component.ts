import { NestedTreeControl } from '@angular/cdk/tree';
import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';
import { ITask } from '../../../models/task.models';
import { StorageService } from '../../../services/storage/storage.service';
import { TaskService } from '../../../services/task/task.service';
import { FriendTaskComponent } from '../friend-task/friend-task.component';

interface Mapa {
  name: string;
  title?: string;
  deadline?: string;
  done?: string;
  children?: Mapa[];
}

@Component({
  selector: 'app-tree-tasks',
  standalone: true,
  imports: [
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    NgClass,
    FriendTaskComponent,
  ],
  templateUrl: './tree-tasks.component.html',
  styleUrl: './tree-tasks.component.scss',
})
export class TreeNestedOverviewExample {
  treeControl = new NestedTreeControl<Mapa>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<Mapa>();
  user = 0;

  constructor(
    private _taskService: TaskService,
    private _storageService: StorageService
  ) {
    this.user = this._storageService.getUser().id;
    this.getAllTasksViewed();
  }

  getAllTasksViewed() {
    this._taskService.getAllTaskViewed(this.user).subscribe({
      next: (data) => {
        const result = Object.entries(data).map(([key, list]) => {
          console.log(data);
          return {
            name: key,
            children: list.map((obj: ITask, i: number) => ({
              task: obj,
              i: i + 1,
            })),
          };
        });

        this.dataSource.data = result;
      },
      error: (error) => {},
    });
  }

  hasChild = (_: number, node: Mapa) =>
    !!node.children && node.children.length > 0;
}
