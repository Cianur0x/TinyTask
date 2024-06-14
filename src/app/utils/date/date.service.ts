import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../models/auth.models';
import { StorageService } from '../../services/storage/storage.service';
import { TaskService } from '../../services/task/task.service';
@Injectable({
  providedIn: 'root',
})
export class DateService {
  user!: IUser;
  constructor(
    private _taskService: TaskService,
    private _storageService: StorageService
  ) {
    this.user = this._storageService.getUser();
  }

  getTaskByMonthDay(year: number, month: number): Observable<any> {
    var firstDay = new Date(year, month, 1);
    var lastDay = new Date(year, month + 1, 0);
    var start = this.customFormatToDB(firstDay);
    var end = this.customFormatToDB(lastDay);

    return this._taskService.getTasksByMonth(start, end, this.user.id);
  }

  customFormatToDB(date: Date): string {
    let fecha = date.toLocaleDateString('en-CA', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });

    return fecha;
  }
}
