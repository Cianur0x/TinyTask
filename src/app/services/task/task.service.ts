import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITask } from '../../models/task.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private taskURL = 'http://localhost:8080/v1/api/tasks/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getTasksByMonth(
    start: string,
    end: string,
    userId: number
  ): Observable<Object> {
    const url = `${this.taskURL}?start=${start}&end=${end}&id=${userId}`;
    return this.httpClient.get(url);
  }

  getAllByIsChecked(
    isDone: boolean,
    tagId: number,
    userId: number
  ): Observable<Object> {
    const url = `${this.taskURL}?isChecked=${isDone}&tagId=${tagId}&userId=${userId}`;
    return this.httpClient.get(url);
  }

  getAllByTagId(tagId: number, userId: number): Observable<Object> {
    const url = `${this.taskURL}?tagId=${tagId}&userId=${userId}`;
    return this.httpClient.get(url);
  }

  postTask(task: ITask): Observable<Object> {
    return this.httpClient.post(this.taskURL, task, this.httpOptions);
  }
}
