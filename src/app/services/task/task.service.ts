import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { IFriendToInvite } from '../../components/tasks/add-friend-dialog/add-friend-dialog.component';
import { ITask } from '../../models/task.models';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  // private taskURL = 'https://tinytaskweb.onrender.com/v1/api/tasks/';
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

  postTask(task: ITask): Observable<Object> {
    return this.httpClient.post(this.taskURL, task, this.httpOptions);
  }

  updateTask(task: ITask): Observable<Object> {
    const url = `${this.taskURL}${task.id}`;
    return this.httpClient.put<ITask>(url, task, this.httpOptions);
  }

  deleteTask(id: number): Observable<unknown> {
    const url = `${this.taskURL}${id}`;
    return this.httpClient
      .delete(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  addViewers(viewers: IFriendToInvite[], taskId: number): Observable<Object> {
    const url = `${this.taskURL}viewers?id=${taskId}`;
    return this.httpClient.put(url, viewers, this.httpOptions);
  }

  getMap(
    start: string,
    end: string,
    userId: number
  ): Observable<{
    totalTasks: Map<number, number>;
    completedTasks: Map<number, number>;
  }> {
    let params = new HttpParams()
      .set('start', start)
      .set('end', end)
      .set('id', userId.toString());

    return this.httpClient.get<{
      totalTasks: Map<number, number>;
      completedTasks: Map<number, number>;
    }>(this.taskURL + 'getmap', { params });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }
}
