import { NgFor, NgIf } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChildren,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import {
  WeekdayComponent,
  toEmit,
} from '../../components/tasks/weekday/weekday.component';
import { ITask } from '../../models/task.models';
import { StorageService } from '../../services/storage/storage.service';
import { TaskService } from '../../services/task/task.service';

@Component({
  selector: 'app-inicio-general',
  standalone: true,
  imports: [
    NgFor,
    MatButtonModule,
    MatIcon,
    WeekdayComponent,
    FontAwesomeModule,
    NgIf,
  ],
  templateUrl: './inicio-general.component.html',
  styleUrl: './inicio-general.component.scss',
})
export class InicioGeneralComponent implements OnInit {
  // FontAwesome Icons
  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;

  // Variables
  user = 0;
  currentDate = 0;
  currentMonth = 0;
  currentYear = 0;
  dayAsCenter = 0;
  userLang = navigator.language;
  isLoggedIn = false;
  roles: string[] = [];
  allTasks!: ITask[];
  date = new Date();
  year = this.date.getFullYear();
  month: any = this.getMonthName(this.date.getMonth());
  numDays = new Date(
    this.date.getFullYear(),
    this.date.getMonth() + 1,
    0
  ).getDate();
  items = Array(this.numDays);
  tasksByDay?: ITask[];

  @ViewChildren('weekday') weekdays?: QueryList<WeekdayComponent>;
  @Input() tasksByTag?: ITask[];

  // Constructores
  constructor(
    private _storageService: StorageService,
    private _taskService: TaskService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log('simplechange inicio-general', changes);
    if (!!this.tasksByTag) {
      this.allTasks = this.tasksByTag;
      console.log('a', this.tasksByTag);
    }
  }

  ngOnInit(): void {
    // Se comprueba que el usuario este logeado
    if (this._storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this._storageService.getUser().roles;
    }
    this.user = this._storageService.getUser().id;
    this.updateDate();
    console.log(this.currentMonth, this.currentYear);
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
    console.log('inicio centerday', day);
    this.dayAsCenter = day;
    this.weekdays?.get(this.dayAsCenter)?.scrollIntoView();
  }

  centerPreviousDay() {
    if (this.dayAsCenter == 0) {
      this.previousMonth();
    } else {
      this.centerDay(this.dayAsCenter - 1);
    }
  }

  centerNextDay() {
    if (this.dayAsCenter == this.numDays - 1) {
      this.nextMonth();
    } else {
      this.centerDay(this.dayAsCenter + 1);
    }
  }

  centerCurrentDay() {
    const today = new Date();
    if (
      this.currentMonth == today.getMonth() &&
      this.currentYear == today.getFullYear()
    ) {
      this.centerDay(today.getDate() - 1);
    } else {
      this.date = today;
      this.updateDate();
    }
  }

  getMonthName(month: number) {
    const monthDate = new Date(this.year, month, 1);
    return this.capitalizeFirstLetter(
      monthDate.toLocaleString(this.userLang, { month: 'long' })
    );
  }

  updateDate() {
    this.currentYear = this.date.getFullYear();
    this.currentMonth = this.date.getMonth();
    this.currentDate = this.date.getDate() - 1;

    this.year = this.currentYear;
    this.month = this.getMonthName(this.currentMonth);
    this.numDays = new Date(
      this.currentYear,
      this.currentMonth + 1,
      0
    ).getDate();
    this.items = Array(this.numDays);

    this.allTasks = [];
    this.getTaskByMonthDay(this.currentYear, this.currentMonth);
    setTimeout(() => this.centerDay(this.currentDate), 1); // para que pueda refrescar y que existe el último diá, problema de pasar de un mes de 30 dias a uno de 31
  }

  previousMonth() {
    this.date = new Date(this.currentYear, this.currentMonth, 0);
    this.updateDate();
  }

  nextMonth() {
    this.date = new Date(this.currentYear, this.currentMonth + 1, 1);
    this.updateDate();
  }

  getTaskByMonthDay(year: number, month: number) {
    var firstDay = new Date(year, month, 1);
    var lastDay = new Date(year, month + 1, 0);
    var start = this.customFormatToDB(firstDay);
    var end = this.customFormatToDB(lastDay);

    this._taskService.getTasksByMonth(start, end, this.user).subscribe({
      next: (data) => {
        this.allTasks = data as ITask[];
        console.log(this.allTasks);
      },
      error: (error) => {
        console.log('Error de conexión al servidor.', error);
      },
    });
  }

  customFormatToDB(date: Date): string {
    let fecha = date.toLocaleDateString('en-CA', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
    console.log('fecha', fecha);
    return fecha;
  }

  filterByDay(day: number): ITask[] {
    let tasks = this.allTasks?.filter(
      (task) =>
        task.deadLine.substring(8, 10) ==
        day.toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })
    );

    return tasks;
  }

  addTaskToArray(info: toEmit) {
    this.allTasks.push(info.task);
  }

  updateTask(info: toEmit) {
    let index = this.allTasks.findIndex((x) => x.id == info.task.id);
    if (index > -1) {
      this.allTasks[index] = info.task;
    }
  }

  deleteTask(info: toEmit) {
    let index = this.allTasks.findIndex((x) => x.id == info.task.id);
    if (index > -1) {
      this.allTasks.splice(index, 1);
    }
  }

  otherTheme: boolean = false;
  changeTheme() {
    this.otherTheme = !this.otherTheme;
  }
}
