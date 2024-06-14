import { Component } from '@angular/core';
import { BarChartComponent } from '../../components/charts/bar-chart/bar-chart.component';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [BarChartComponent],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
})
export class StatisticsComponent {}
