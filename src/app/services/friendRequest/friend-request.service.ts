import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IFriendRequest } from '../../models/request.models';

@Injectable({
  providedIn: 'root',
})
export class FriendRequestService {
  private requestURL = 'http://localhost:8080/v1/api/request';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  sendFriendRequest(request: IFriendRequest): Observable<Object> {
    return this.httpClient.post(this.requestURL, request, this.httpOptions);
  }

  getFriendRequestEnviadas(id: number): Observable<Object> {
    const url = `${this.requestURL}/requestsent?id=${id}`;
    return this.httpClient.get(url);
  }
  getFriendRequestRecibidas(id: number): Observable<Object> {
    const url = `${this.requestURL}/requestreceive?id=${id}`;
    return this.httpClient.get(url);
  }

  updateRequest(request: IFriendRequest): Observable<Object> {
    const url = `${this.requestURL}/${request.id}`;
    return this.httpClient.put<IFriendRequest>(url, request, this.httpOptions);
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
