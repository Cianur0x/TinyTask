import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

export interface Image {
  cols: number;
  rows: number;
  img: string;
}

export interface Feature {
  name: string;
  list: string[];
  img: string;
}

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [
    MatGridListModule,
    NgOptimizedImage,
    MatCardModule,
    MatDividerModule,
    FontAwesomeModule,
  ],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss',
})
export class FeaturesComponent {
  faStar = faStar;
  tiles: Image[] = [
    {
      img: 'assets/imgs/bwink_bld_03.jpg',
      cols: 3,
      rows: 3,
    },
    {
      img: 'assets/imgs/bwink_edu_02.jpg',
      cols: 1,
      rows: 1,
    },
    {
      img: 'assets/imgs/bwink_edu_04.jpg',
      cols: 1,
      rows: 1,
    },
    {
      img: 'assets/imgs/bwink_edu_05.jpg',
      cols: 1,
      rows: 1,
    },
  ];

  features: Feature[] = [
    {
      name: 'Plan your work and personal task in one place',
      list: ['Separate your work & personal tasks or combine them both'],
      img: 'assets/imgs/bwink_med_06.jpg',
    },
    {
      name: 'Design task management',
      list: [
        'Customizable task views for managing design tasks',
        'Drag tasks to time-boxs',
      ],
      img: 'assets/imgs/bwink_msc_05.jpg',
    },
    {
      name: 'Organize projects',
      list: [
        'Streamlined daily task entry',
        'Allocate specific times to tasks',
        'Weekly task view for your tasks and calendar',
      ],
      img: 'assets/imgs/bwink_msc_07.jpg',
    },
  ];
}
