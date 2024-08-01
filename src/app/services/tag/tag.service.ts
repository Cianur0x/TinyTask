import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ITag, ITagBack } from '../../models/task.models';

@Injectable({
  providedIn: 'root',
})
export class TagService {
  // private tagURL = 'https://tinytaskweb.onrender.com/v1/api/tags';
  private tagURL = 'http://localhost:8080/v1/api/tags';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getAllTags(userId: number): Observable<Object> {
    const url = `${this.tagURL}?allTags=${userId}`;
    return this.httpClient.get(url);
  }

  postTask(tag: ITagBack): Observable<Object> {
    return this.httpClient.post(this.tagURL, tag, this.httpOptions);
  }

  updateTask(tag: ITagBack): Observable<Object> {
    const url = `${this.tagURL}/${tag.id}`;
    return this.httpClient.put<ITagBack>(url, tag, this.httpOptions);
  }

  deleteTag(id: number): Observable<unknown> {
    const url = `${this.tagURL}/${id}`;
    return this.httpClient
      .delete(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getMap(
    start: string,
    end: string,
    userId: number, // fixme que el ID del usuario se pille dle token en el auth y no pasarlo por el cleinte xd
    tagId: number
  ): Observable<{
    totalTasks: Map<number, number>;
    completedTasks: Map<number, number>;
  }> {
    let params = new HttpParams()
      .set('start', start)
      .set('end', end)
      .set('id', userId.toString())
      .set('tagId', tagId.toString());

    return this.httpClient.get<{
      totalTasks: Map<number, number>;
      completedTasks: Map<number, number>;
    }>(this.tagURL + '/getmap', { params });
  }

  getDoughnut(
    start: string,
    end: string,
    userId: number // fixme que el ID del usuario se pille dle token en el auth y no pasarlo por el cleinte xd
  ) {
    let params = new HttpParams()
      .set('start', start)
      .set('end', end)
      .set('id', userId.toString());

    return this.httpClient.get(this.tagURL + '/getdoughnut', { params });
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
