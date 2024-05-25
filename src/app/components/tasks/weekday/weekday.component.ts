import { NgClass } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { StorageService } from '../../../services/storage/storage.service';
import { TaskService } from '../../../services/task/task.service';
import { AddTaskDialogComponent } from '../add-task-dialog/add-task-dialog.component';
import { ITask } from '../../../models/task.models';

export interface DialogData {
  animal: string;
  name: string;
}

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
  ],
  templateUrl: './weekday.component.html',
  styleUrl: './weekday.component.scss',
})
export class WeekdayComponent implements OnInit {
  // Variables
  userLang = navigator.language;
  fullDate = new Date();
  currentDate = this.fullDate.getUTCDate();
  dayName = '';
  numTasks = 0;
  user = 0;
  allTasks: ITask[] = [];
  @Input() day = 0;
  @ViewChild('target', { static: true }) target?: ElementRef;

  // Constructores
  constructor(
    public dialog: MatDialog,
    private _taskService: TaskService,
    private _storageServer: StorageService
  ) {}

  ngOnInit(): void {
    this.dayName = this.customFormat(this.fullDate, this.userLang);
    this.user = this._storageServer.getUser().id;
    this.getAllTask(this.day);
    console.log('dia', this.day);
  }

  // Métodos

  getAllTask(diaNumber: number) {
    let fullDate = new Date();
    let dia = diaNumber;
    let mes = fullDate.getUTCMonth();
    let year = fullDate.getUTCFullYear();
    let fecha = `${year}-${mes + 1}-${dia}`;

    console.log('fecha', fecha);

    this._taskService.getTasksByDeadline(fecha, this.user).subscribe({
      next: (data) => {
        this.allTasks = data as ITask[];
        this.numTasks = this.allTasks.length;
      },
      error: (error) => {
        console.log('Error de conexión al servidor.');
      },
    });
  }

  /**
   * Devuelve un formato de fecha personalizado
   * @param date la fecha
   * @param locale el local donde se encuentra el usuario
   * @returns string de fecha con el formato indicado
   */
  customFormat = (date: Date, locale: string) => {
    let dia = this.day;
    let mes = date.getUTCMonth();
    let year = date.getUTCFullYear();
    let fecha = new Date(Date.UTC(year, mes, dia));
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
