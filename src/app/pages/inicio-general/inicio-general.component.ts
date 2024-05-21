import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { WeekdayComponent } from '../../components/tasks/weekday/weekday.component';
import { StorageService } from '../../services/storage/storage.service';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-inicio-general',
  standalone: true,
  imports: [
    NgFor,
    MatButtonModule,
    MatIcon,
    WeekdayComponent,
    FontAwesomeModule,
  ],
  templateUrl: './inicio-general.component.html',
  styleUrl: './inicio-general.component.scss',
})
export class InicioGeneralComponent implements OnInit {
  // FontAwesome Icons
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;

  // Variables
  currentDate = 0;
  dayAsCenter = 0;
  userLang = navigator.language;
  isLoggedIn = false;
  roles: string[] = [];
  date = new Date();
  month: any = this.date.toLocaleString(this.userLang, { month: 'long' });
  year = this.date.getFullYear();
  numDays = new Date(
    this.date.getFullYear(),
    this.date.getMonth() + 1,
    0
  ).getDate();
  items = Array(this.numDays);

  @ViewChildren('weekday') weekdays?: QueryList<WeekdayComponent>;

  // Constructores
  constructor(private storageService: StorageService, private router: Router) {
    this.month = this.capitalizeFirstLetter(this.month);
    console.log(this.numDays);
  }

  ngOnInit(): void {
    // Se comprueba que el usuario este logeado
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
      this.router.navigateByUrl('inicio').then(() => {
        console.log('Ya logueado, cargando index.');
      });
    }
    this.currentDate = this.date.getDate() - 1;
    this.dayAsCenter = this.currentDate;
  }

  ngAfterViewInit(): void {
    // poner el dia al que quiero hacer el scroll
    this.weekdays?.get(this.dayAsCenter)?.scrollIntoView();
  }

  // Métodos
  capitalizeFirstLetter(mes: string): string {
    return mes.charAt(0).toUpperCase() + mes.slice(1);
  }

  centerDay(day: number) {
    console.log(day);
    this.dayAsCenter = day;
    this.weekdays?.get(this.dayAsCenter)?.scrollIntoView();
  }
}
