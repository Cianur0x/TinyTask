import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageResponse } from '../../models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class PruebaService {
  // private apiPruebaURL = 'https://tinytaskweb.onrender.com/v1/api/prueba';
  private apiPruebaURL = 'http://localhost:8080/v1/api/prueba';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  prueba(): Observable<MessageResponse> {
    return this.httpClient.get<MessageResponse>(this.apiPruebaURL);
  }

  pruebaSoloAdmin(): Observable<MessageResponse> {
    return this.httpClient.get<MessageResponse>(
      this.apiPruebaURL + '/solo-admin'
    );
  }
}
