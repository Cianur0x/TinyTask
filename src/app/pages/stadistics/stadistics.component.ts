import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BarChartComponent } from '../../components/charts/bar-chart/bar-chart.component';
import { ImageComponent } from '../../components/image/image.component';
import { StorageService } from '../../services/storage/storage.service';
import { TaskService } from '../../services/task/task.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-stadistics',
  standalone: true,
  imports: [BarChartComponent, ImageComponent, NgIf, MatProgressSpinnerModule],
  templateUrl: './stadistics.component.html',
  styleUrl: './stadistics.component.scss',
})
export class StadisticsComponent {
  constructor(
    private _taskService: TaskService,
    private _storageService: StorageService,
    private _userService: UserService
  ) {}
}
