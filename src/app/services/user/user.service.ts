import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { IUserPut } from '../../models/user.models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userURL = 'https://tinytaskweb.onrender.com/v1/api/users';
  private imageURL = 'https://tinytaskweb.onrender.com/v1/api/image';
  // private userURL = 'http://localhost:8080/v1/api/users';
  // private imageURL = 'http://localhost:8080/v1/api/image';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  addFriends(friend: string, userId: number): Observable<Object> {
    const url = `${this.userURL}?friend=${friend}&id=${userId}`;
    return this.httpClient.get(url);
  }

  getFriendsList(id: number): Observable<Object> {
    const url = `${this.userURL}/friendlist?id=${id}`;
    return this.httpClient.get(url);
  }

  subirImagen(usuarioId: number, file: File): Observable<any> {
    const formData: FormData = new FormData();

    formData.append('image', file);

    return this.httpClient.post(`${this.imageURL}/${usuarioId}`, formData, {
      responseType: 'json',
    });
  }

  obtenerImagen(usuarioId: number): Observable<any> {
    return this.httpClient.get(`${this.imageURL}/${usuarioId}`, {
      responseType: 'blob',
    });
  }

  deleteProfileImage(id: number): Observable<unknown> {
    const url = `${this.imageURL}/${id}`;
    return this.httpClient
      .delete(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  postUser(user: IUserPut): Observable<Object> {
    return this.httpClient.post(this.userURL, user, this.httpOptions);
  }

  updateUser(user: IUserPut): Observable<Object> {
    const url = `${this.userURL}/edituser`;
    return this.httpClient.put<IUserPut>(url, user, this.httpOptions);
  }

  updateBio(bio: string): Observable<Object> {
    const url = `${this.userURL}/editbio`;
    return this.httpClient.put<IUserPut>(url, bio, this.httpOptions);
  }

  updateState(state: string): Observable<Object> {
    const url = `${this.userURL}/editstate`;
    return this.httpClient.put<IUserPut>(url, state, this.httpOptions);
  }

  getUser(id: number): Observable<Object> {
    const url = `${this.userURL}/getuser/${id}`;
    return this.httpClient.get(url);
  }

  deleteFriend(id: number, myid: number): Observable<unknown> {
    const url = `${this.userURL}/${myid}/${id}`;
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
