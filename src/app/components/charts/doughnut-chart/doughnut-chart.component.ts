import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ITag } from '../../../models/task.models';
import { StorageService } from '../../../services/storage/storage.service';
import { TagService } from '../../../services/tag/tag.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-doughnut-chart',
  standalone: true,
  imports: [],
  templateUrl: './doughnut-chart.component.html',
  styleUrl: './doughnut-chart.component.scss',
})
export class DoughnutChartComponent implements OnChanges {
  totalCounts: number[] = [];
  tagIdArr: number[] = [];
  chart: any;
  date = new Date();
  userId: number = 0;
  @Input() allTagsChild: ITag[] = [];

  constructor(
    private _tagService: TagService,
    private _storageService: StorageService
  ) {
    this.userId = this._storageService.getUser().id;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getDoghtnut();
  }

  getDoghtnut() {
    this._tagService
      .getDoughnut('2024-01-01', '2024-12-31', this.userId)
      .subscribe({
        next: (data) => {
          this.separateKeysAndValues(data);
          this.getLabelAndColors();
          setTimeout(() => {
            this.createChart();
          }, 500);
        },
        error: (error) => {
          console.log('Error de conexión al servidor.');
        },
      });
  }

  colorsTagsArr: string[] = [];
  nameTagsArr: string[] = [];

  getLabelAndColors() {
    this.colorsTagsArr = [];
    this.nameTagsArr = [];
    this.allTagsChild.forEach((x) => {
      this.colorsTagsArr.push(x.labelColor);
      this.nameTagsArr.push(x.name);
    });
  }

  separateKeysAndValues(data: any): void {
    this.tagIdArr = [];
    this.totalCounts = [];

    Object.entries(data);
    for (const [key, value] of Object.entries(data)) {
      this.tagIdArr.push(Number(key));
      this.totalCounts.push(Number(value));
    }
  }

  createChart() {
    if (!!this.chart) {
      this.chart.destroy();
    }
    const data = {
      labels: [...this.nameTagsArr],
      datasets: [
        {
          label: 'Nº Tasks',
          data: [...this.totalCounts],
          backgroundColor: [...this.colorsTagsArr],
          hoverOffset: 4,
        },
      ],
    };
    this.chart = new Chart('ctx', {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }
}
