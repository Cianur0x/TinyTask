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
  month: any = this.date.toLocaleString(this.userLang, { month: 'long' });
  year = this.date.getFullYear();
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
  ) {
    this.month = this.capitalizeFirstLetter(this.month);
  }

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
    this.currentDate = this.date.getDate() - 1; // no recuerdo pq le restabamos 1
    this.dayAsCenter = this.currentDate;
    this.user = this._storageService.getUser().id;

    // se calcula el año y el mes actuales
    this.currentMonth = this.date.getMonth();
    this.currentYear = this.date.getFullYear();
    console.log(this.currentMonth, this.currentYear);
    this.getTaskByMonthDay(this.currentYear, this.currentMonth);
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
    if (this.dayAsCenter == 0) {
      // TODO hay que comprobar que hacer con los extremos
    }
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
