import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-weekday',
  standalone: true,
  imports: [NgClass],
  templateUrl: './weekday.component.html',
  styleUrl: './weekday.component.scss',
})
export class WeekdayComponent implements OnInit {
  // Variables
  userLang = navigator.language;
  fullDate = new Date();
  currentDate = this.fullDate.getDate();
  dayName = '';
  @Input() day = 0;

  // Constructores
  constructor() {}
  ngOnInit(): void {
    this.dayName = this.customFormat(this.fullDate, this.userLang);
    this.goToActualDay();
  }

  // Métodos
  customFormat = (date: Date, locale: string) => {
    let dia = this.day;
    let mes = date.getMonth();
    let year = date.getFullYear();
    let fecha = new Date(year, mes, dia);
    let longdate = fecha.toLocaleDateString(locale, {
      day: '2-digit',
      weekday: 'long',
    });

    return `${longdate}`;
  };

  goToActualDay() {
    document.getElementById('center')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'center',
    });
  }
}
