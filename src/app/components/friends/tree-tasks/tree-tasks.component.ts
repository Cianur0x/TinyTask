import { NestedTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule, MatTreeNestedDataSource } from '@angular/material/tree';
import { Task } from '../../../pages/friends-list/friends-list.component';
import { StorageService } from '../../../services/storage/storage.service';
import { TaskService } from '../../../services/task/task.service';

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
  imports: [MatTreeModule, MatButtonModule, MatIconModule],
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
          return {
            name: key,
            children: list.map((obj: Task) => ({
              title: obj.title,
              deadline: obj.deadLine,
              done: obj.taskDone == true ? 'Yes' : 'No',
            })),
          };
        });

        console.log(result);
        this.dataSource.data = result;
      },
      error: (error) => {},
    });
  }

  hasChild = (_: number, node: Mapa) =>
    !!node.children && node.children.length > 0;
}
