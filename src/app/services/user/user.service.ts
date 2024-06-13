import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserPut } from '../../models/user.models';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userURL = 'https://tinytaskweb.onrender.com/v1/api/users';
  private imageURL = 'https://tinytaskweb.onrender.com/v1/api/image';

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
    formData.append('imagefile', file);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');

    return this.httpClient.post(
      `${this.imageURL}/${usuarioId}/image`,
      formData,
      { headers }
    );
  }

  obtenerImagen(usuarioId: number): Observable<any> {
    return this.httpClient.get(`${this.imageURL}/${usuarioId}/userimage`, {
      responseType: 'blob',
    });
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
    const url = `${this.userURL}/${id}`;
    return this.httpClient.get(url);
  }
}
