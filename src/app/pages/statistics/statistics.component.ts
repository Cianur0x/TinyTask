import { Component } from '@angular/core';
import { BarChartComponent } from '../../components/charts/bar-chart/bar-chart.component';
import { BadgeComponent } from '../../components/charts/badge/badge.component';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [BarChartComponent, BadgeComponent],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
})
export class StatisticsComponent {}
