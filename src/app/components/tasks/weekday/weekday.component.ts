import { NgClass, NgFor } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
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

export interface toEmit {
  task: ITask;
  operation: string;
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
    NgFor,
    LittleTaskComponent,
  ],
  templateUrl: './weekday.component.html',
  styleUrl: './weekday.component.scss',
})
export class WeekdayComponent implements OnInit {
  // Variables
  userLang = navigator.language;
  user = 0;
  @Input() highlight: boolean = false;
  @Input() todayTasks?: ITask[];
  @Input() day = 0;
  @Input() month = 0;
  @Input() year = 0;
  @ViewChild('target', { static: true }) target?: ElementRef;
  mytasks?: ITask[];
  info!: toEmit;
  @Output() addTask = new EventEmitter<toEmit>();
  @Output() updateTask = new EventEmitter<toEmit>();
  @Output() deleteTask = new EventEmitter<toEmit>();

  // Constructores
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}
  // Métodos

  /**
   * Devuelve un formato de fecha personalizado
   * @param date la fecha
   * @param locale el local donde se encuentra el usuario
   * @returns string de fecha con el formato indicado
   */
  customFormat = (locale: string) => {
    const fecha = new Date(this.year, this.month, this.day);
    const longdate = fecha.toLocaleDateString(locale, {
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
    const dialogRef = this.dialog.open(AddTaskDialogComponent, {
      data: {
        currentDay: this.day,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.info = result;
      if (!!this.info) {
        this.addTask.emit(this.info);
      }
    });
  }

  updateTaskParent(info: toEmit) {
    this.updateTask.emit(info);
  }

  deleteTaskParent(info: toEmit) {
    this.deleteTask.emit(info);
  }
}
