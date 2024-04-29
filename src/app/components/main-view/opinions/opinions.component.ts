import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NgOptimizedImage } from '@angular/common';

export interface Opinion {
  name: string;
  opinion: string;
  img: string;
}

@Component({
  selector: 'app-opinions',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, NgOptimizedImage],
  templateUrl: './opinions.component.html',
  styleUrl: './opinions.component.scss',
})
export class OpinionsComponent {
  opinions: Opinion[] = [
    {
      name: 'Emma Thompson',
      opinion: `TinyTask simplifies my day with its seamless integration of to-do lists and calendars. It's my go-to for staying on top of my workload.`,
      img: 'assets/imgs/people1.jpg',
    },
    {
      name: 'Clara Johnson',
      opinion: `TinyTask's customizable categories help me stay organized across projects, boosting my productivity as a freelancer.`,
      img: 'assets/imgs/people2.jpg',
    },
    {
      name: 'Maxwell Parker',
      opinion: `TinyTask keeps me organized anywhere with its reminders and notifications. It's now essential to my daily routine.`,
      img: 'assets/imgs/people1.jpg',
    },
    {
      name: 'Jackson Smith',
      opinion: `TinyTask's intuitive design helps me stay focused on tasks, whether work or personal. Highly recommended for schedule control.`,
      img: 'assets/imgs/people3.jpg',
    },
  ];

  opiniones: Opinion[] = [
    {
      name: 'Emma Thompson',
      opinion: `TinyTask simplifies my day with its seamless integration of to-do lists and calendars. It's my go-to for staying on top of my workload.`,
      img: 'assets/imgs/people1.jpg',
    },
    {
      name: 'Clara Johnson',
      opinion: `TinyTask's customizable categories help me stay organized across projects, boosting my productivity as a freelancer.`,
      img: 'assets/imgs/people2.jpg',
    },
    {
      name: 'Maxwell Parker',
      opinion: `TinyTask keeps me organized anywhere with its reminders and notifications. It's now essential to my daily routine.`,
      img: 'assets/imgs/people1.jpg',
    },
    {
      name: 'Jackson Smith',
      opinion: `TinyTask's intuitive design helps me stay focused on tasks, whether work or personal. Highly recommended for schedule control.`,
      img: 'assets/imgs/people3.jpg',
    },
  ];
}
