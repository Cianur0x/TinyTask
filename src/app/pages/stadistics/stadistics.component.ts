import { Component } from '@angular/core';
import { BarChartComponent } from '../../components/charts/bar-chart/bar-chart.component';

@Component({
  selector: 'app-stadistics',
  standalone: true,
  imports: [BarChartComponent],
  templateUrl: './stadistics.component.html',
  styleUrl: './stadistics.component.scss',
})
export class StadisticsComponent {}
