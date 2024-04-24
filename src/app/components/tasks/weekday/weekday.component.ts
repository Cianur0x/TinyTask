import { Component } from '@angular/core';

@Component({
  selector: 'app-weekday',
  standalone: true,
  imports: [],
  templateUrl: './weekday.component.html',
  styleUrl: './weekday.component.scss',
})
export class WeekdayComponent {
  days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  d = new Date();
  dayName = this.days[this.d.getDay()];
}
