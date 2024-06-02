import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userURL = 'http://localhost:8080/v1/api/users';

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

  getFriendsList(id: number) {
    const url = `${this.userURL}/friendlist?id=${id}`;
    return this.httpClient.get(url);
  }
}
