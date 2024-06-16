import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BadgeService {
  private badgeURL = 'https://tinytaskweb.onrender.com/v1/api/badges';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getUser(id: number): Observable<Object> {
    const url = `${this.badgeURL}/userbadge/${id}`;
    return this.httpClient.get(url);
  }
}
