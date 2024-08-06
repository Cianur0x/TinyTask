import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Chart, Colors, registerables } from 'chart.js';
import { StorageService } from '../../../services/storage/storage.service';
import { TagService } from '../../../services/tag/tag.service';
import { ITag } from '../../../models/task.models';
Chart.register(...registerables);
Chart.register(Colors);

@Component({
  selector: 'app-tags-chart',
  standalone: true,
  imports: [],
  templateUrl: './tags-chart.component.html',
  styleUrl: './tags-chart.component.scss',
})
export class TagsChartComponent implements OnInit, OnChanges {
  months: number[] = [];
  monthsNames: string[] = [];
  totalCounts: number[] = [];
  completedCounts: number[] = [];
  chart!: Chart;
  userId = this._storageService.getUser().id;
  @Input() tag: number = 0;
  @Input() allTagsChild: ITag[] = [];

  currentTag: ITag = this.allTagsChild[0];
  constructor(
    private _tagService: TagService,
    private _storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.currentTag = this.allTagsChild[0];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.tag != 0) {
      this.getMapForTag();
    }
  }

  getMapForTag() {
    this._tagService
      .getMap('2024-01-01', '2024-12-31', this.userId, this.tag)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.separateKeysAndValues(data);
          this.monthsNames = this.convertToMonthNames(this.months);
          this.createChart();
        },
        error: (error) => {},
      });
  }

  createChart() {
    const pos = this.allTagsChild.find((x) => x.id == this.tag);
    this.currentTag = pos == undefined ? this.allTagsChild[0] : pos;
    if (!!this.chart) {
      this.chart.destroy();
    }

    const data = {
      labels: [...this.monthsNames],
      datasets: [
        {
          label: `${this.currentTag.name}`,
          data: [...this.totalCounts],
          backgroundColor: this.currentTag.labelColor,
        },
      ],
    };

    this.chart = new Chart('ctx', {
      type: 'bar',
      data: data,
      options: {
        maintainAspectRatio: false,
        indexAxis: 'y',
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
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
