import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private userURL = 'http://localhost:8080/v1/api/admin';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  getAllUsers(): Observable<Object> {
    const url = `${this.userURL}`;
    return this.httpClient.get(url);
  }
}
