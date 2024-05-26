import { NgClass, NgFor } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ITask } from '../../../models/task.models';
import { AddTaskDialogComponent } from '../add-task-dialog/add-task-dialog.component';
import { LittleTaskComponent } from '../little-task/little-task.component';

@Component({
  selector: 'app-weekday',
  standalone: true,
  imports: [
    NgClass,
    MatButtonModule,
    MatIcon,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    NgFor,
    LittleTaskComponent,
  ],
  templateUrl: './weekday.component.html',
  styleUrl: './weekday.component.scss',
})
export class WeekdayComponent implements OnInit {
  // Variables
  userLang = navigator.language;
  fullDate = new Date();
  dayName = '';
  user = 0;
  @Input() todayTasks?: ITask[];
  @Input() day = 0;
  @ViewChild('target', { static: true }) target?: ElementRef;
  mytasks?: ITask[];

  // Constructores
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.dayName = this.customFormat(this.fullDate, this.userLang);
  }
  // Métodos

  /**
   * Devuelve un formato de fecha personalizado
   * @param date la fecha
   * @param locale el local donde se encuentra el usuario
   * @returns string de fecha con el formato indicado
   */
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

  /**
   * llamada al hijo para hacer un scroll al componente indicado
   */
  scrollIntoView() {
    this.target?.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'center',
    });
  }

  /**
   * función para abrir el diálogo donde se creará la tarea
   */
  openDialog(): void {
    this.dialog.open(AddTaskDialogComponent, {
      data: {
        currentDay: this.day,
      },
    });
  }
}
