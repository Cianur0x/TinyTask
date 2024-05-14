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
  userLang = navigator.language;
  fullDate = new Date();
  currentDate = this.fullDate.getDate();

  @Input() day = 0;

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

  dayName = '';
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.dayName = this.customFormat(this.fullDate, this.userLang);
  }
}
