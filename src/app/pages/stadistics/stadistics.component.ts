import { Component } from '@angular/core';
import { BarChartComponent } from '../../components/charts/bar-chart/bar-chart.component';
import { TaskService } from '../../services/task/task.service';
import { StorageService } from '../../services/storage/storage.service';
import { ImageComponent } from '../../components/image/image.component';

@Component({
  selector: 'app-stadistics',
  standalone: true,
  imports: [BarChartComponent, ImageComponent],
  templateUrl: './stadistics.component.html',
  styleUrl: './stadistics.component.scss',
})
export class StadisticsComponent {
  constructor(
    private _taskService: TaskService,
    private _storageService: StorageService
  ) {}
}
