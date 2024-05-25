import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TagService {
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
}
