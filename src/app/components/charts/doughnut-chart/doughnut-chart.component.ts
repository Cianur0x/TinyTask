import { Component } from '@angular/core';
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
export class DoughnutChartComponent {
  totalCounts: number[] = [];
  tagIdArr: number[] = [];
  chart: any;
  date = new Date();
  userId: number = 0;
  allTags!: ITag[];

  constructor(
    private _tagService: TagService,
    private _storageService: StorageService
  ) {
    this.userId = this._storageService.getUser().id;

    this._tagService
      .getDoughnut('2024-01-01', '2024-12-31', this.userId)
      .subscribe({
        next: (data) => {
          this.separateKeysAndValues(data);
          this.getTags();
        },
        error: (error) => {
          console.log('Error de conexión al servidor.');
        },
      });
  }

  colorsTagsArr: string[] = [];
  nameTagsArr: string[] = [];

  getTags() {
    this._tagService.getAllTags(this.userId).subscribe({
      next: (data) => {
        this.allTags = data as ITag[];
        this.getLabelAndColors();
        this.createChart();
      },
      error: (error) => {
        console.error('Error de conexión al servidor.', error);
      },
    });
  }

  getLabelAndColors() {
    this.allTags.forEach((x) => {
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
    console.log('separete keys', data);
  }

  createChart() {
    const data = {
      labels: [...this.nameTagsArr],
      datasets: [
        {
          label: 'Nº Tasks',
          data: [...this.totalCounts],
          backgroundColor: [...this.colorsTagsArr],
        },
      ],
    };
    this.chart = new Chart('ctx', {
      type: 'doughnut',
      data: data,
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Doughnut',
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }
}
