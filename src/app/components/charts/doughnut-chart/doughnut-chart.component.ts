import { Component } from '@angular/core';
import { TagService } from '../../../services/tag/tag.service';
import { StorageService } from '../../../services/storage/storage.service';

@Component({
  selector: 'app-doughnut-chart',
  standalone: true,
  imports: [],
  templateUrl: './doughnut-chart.component.html',
  styleUrl: './doughnut-chart.component.scss',
})
export class DoughnutChartComponent {
  months: number[] = [];
  monthsNames: string[] = [];
  totalCounts: number[] = [];
  completedCounts: number[] = [];
  chart: any;
  date = new Date();

  constructor(
    private _tagService: TagService,
    private _storageService: StorageService
  ) {
    let userId = this._storageService.getUser().id;

    this._tagService.getDoughnut('2024-01-01', '2024-12-31', userId).subscribe({
      next: (data) => {
        // this.separateKeysAndValues(data);
        console.log(data);
        // this.monthsNames = this.convertToMonthNames(this.months);
        // this.createChart();
      },
      error: (error) => {
        console.log('Error de conexión al servidor.');
      },
    });
  }

  // createChart() {
  //   const data = {
  //     labels: [...this.monthsNames],
  //     datasets: [
  //       {
  //         label: 'Tasks Done',
  //         data: [...this.completedCounts],
  //         backgroundColor: '#B9B4C7',
  //       },
  //       {
  //         label: 'All Tasks',
  //         data: [...this.totalCounts],
  //         backgroundColor: '#5C5470',
  //       },
  //     ],
  //   };
  //   this.chart = new Chart('ctx', {
  //     type: 'bar',
  //     data: data,
  //     options: {
  //       plugins: {
  //         title: {
  //           display: true,
  //           text: 'Overview',
  //         },
  //       },
  //       responsive: true,
  //       maintainAspectRatio: false,
  //       scales: {
  //         x: {
  //           stacked: true,
  //         },
  //         y: {
  //           stacked: true,
  //         },
  //       },
  //     },
  //   });
  // }
}
