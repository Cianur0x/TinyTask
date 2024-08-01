import { Component, Input } from '@angular/core';
import { Chart, Colors, registerables } from 'chart.js';
import { ITag } from '../../../models/task.models';
import { StorageService } from '../../../services/storage/storage.service';
import { TagService } from '../../../services/tag/tag.service';
Chart.register(...registerables);
Chart.register(Colors);

@Component({
  selector: 'app-tags-chart',
  standalone: true,
  imports: [],
  templateUrl: './tags-chart.component.html',
  styleUrl: './tags-chart.component.scss',
})
export class TagsChartComponent {
  months: number[] = [];
  monthsNames: string[] = [];
  totalCounts: number[] = [];
  completedCounts: number[] = [];
  chart: any;
  @Input() tag: ITag | null = null;

  constructor(
    private _tagService: TagService,
    private _storageService: StorageService
  ) {
    console.log(this.tag);
    let userId = this._storageService.getUser().id;

    this._tagService.getMap('2024-01-01', '2024-12-31', userId, 6).subscribe({
      next: (data) => {
        console.log(data);
        this.separateKeysAndValues(data);
        this.monthsNames = this.convertToMonthNames(this.months);
        this.createChart();
      },
      error: (error) => {
        console.log('Error de conexión al servidor.');
      },
    });
  }

  createChart() {
    const data = {
      labels: [...this.monthsNames],
      datasets: [
        {
          label: 'Dataset 1',
          data: [...this.totalCounts],
          borderColor: '#740063',
          backgroundColor: '#740063',
        },
      ],
    };

    this.chart = new Chart('ctx', {
      type: 'bar',
      data: data,
      options: {
        indexAxis: 'y',
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'Chart.js Horizontal Bar Chart',
          },
        },
      },
    });
  }

  tagPressed(tag: any) {
    console.log(this.tagPressed);
  }
  // actions = [
  //   {
  //     name: 'Add Dataset',
  //     handler(chart: any) {
  //       const data = chart.data;
  //       const dsColor = Utils.namedColor(chart.data.datasets.length);
  //       const newDataset = {
  //         label: 'Dataset ' + (data.datasets.length + 1),
  //         backgroundColor: Utils.transparentize(dsColor, 0.5),
  //         borderColor: dsColor,
  //         borderWidth: 1,
  //         data: Utils.numbers({
  //           count: data.labels.length,
  //           min: -100,
  //           max: 100,
  //         }),
  //       };
  //       chart.data.datasets.push(newDataset);
  //       chart.update();
  //     },
  //   },
  //   {
  //     name: 'Remove Dataset',
  //     handler(chart: any) {
  //       chart.data.datasets.pop();
  //       chart.update();
  //     },
  //   },
  // ];

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

  userLang = navigator.language;

  convertToMonthNames(arr: number[]) {
    let newArr: string[] = [];
    arr.forEach((x) => {
      newArr.push(this.monthName(x - 1));
    });

    return newArr;
  }

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
