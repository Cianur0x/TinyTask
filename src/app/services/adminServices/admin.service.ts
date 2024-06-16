import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { UserRole } from '../../pages/manage-users/manage-users.component';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private adminURL = 'http://localhost:8080/v1/api/admin';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getAllUsers(): Observable<Object> {
    const url = `${this.adminURL}`;
    return this.httpClient.get(url);
  }

  updateRole(userRole: UserRole): Observable<Object> {
    const url = `${this.adminURL}/editrole`;
    return this.httpClient.put<UserRole>(url, userRole, this.httpOptions);
  }

  deleteUser(id: number): Observable<unknown> {
    const url = `${this.adminURL}/${id}`;
    return this.httpClient
      .delete(url, this.httpOptions)
      .pipe(catchError(this.handleError));
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
