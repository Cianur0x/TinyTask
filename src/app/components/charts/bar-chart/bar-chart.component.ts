import { Component, OnInit } from '@angular/core';
import { Chart, Colors, registerables } from 'chart.js';
import { StorageService } from '../../../services/storage/storage.service';
import { TaskService } from '../../../services/task/task.service';
import { UserService } from '../../../services/user/user.service';
Chart.register(...registerables);
Chart.register(Colors);

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss',
})
export class BarChartComponent implements OnInit {
  months: number[] = [];
  monthsNames: string[] = [];
  totalCounts: number[] = [];
  completedCounts: number[] = [];
  chart: any;
  date = new Date();

  constructor(
    private _taskService: TaskService,
    private _storageService: StorageService
  ) {
    let userId = this._storageService.getUser().id;

    this._taskService.getMap('2024-01-01', '2024-12-31', userId).subscribe({
      next: (data) => {
        this.separateKeysAndValues(data);
        console.log(this.months);
        this.monthsNames = this.convertToMonthNames(this.months);
        this.createChart();
      },
      error: (error) => {
        console.log('Error de conexión al servidor.');
      },
    });
  }

  ngOnInit(): void {}

  createChart() {
    const data = {
      labels: [...this.monthsNames],
      datasets: [
        {
          label: 'Tasks Done',
          data: [...this.completedCounts],
          backgroundColor: '#B9B4C7',
        },
        {
          label: 'All Tasks',
          data: [...this.totalCounts],
          backgroundColor: '#5C5470',
        },
      ],
    };

    this.chart = new Chart('ctx', {
      type: 'bar',
      data: data,
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Overview',
          },
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
          },
        },
      },
    });
  }

  separateKeysAndValues(data: {
    totalTasks: Map<number, number>;
    completedTasks: Map<number, number>;
  }): void {
    this.months = [];
    this.totalCounts = [];
    this.completedCounts = [];

    Object.entries(data.totalTasks).forEach(([key, value]) => {
      this.months.push(Number(key));
      this.totalCounts.push(value);
    });

    Object.entries(data.completedTasks).forEach(([key, value]) => {
      const index = this.months.indexOf(Number(key));
      if (index !== -1) {
        this.completedCounts[index] = value;
      }
    });
  }

  convertToMonthNames(arr: number[]) {
    let newArr: string[] = [];
    arr.forEach((x) => {
      newArr.push(this.monthName(x - 1));
    });

    return newArr;
  }

  userLang = navigator.language;
  customFormat = (locale: string) => {
    const fecha = new Date();
  };

  monthName(mon: number) {
    var date = new Date(),
      y = date.getFullYear();
    var firstDay = new Date(y, mon, 1);
    const monthName = firstDay.toLocaleDateString(this.userLang, {
      month: 'long',
    });

    return monthName;
  }
}
