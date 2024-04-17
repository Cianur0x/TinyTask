import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { Observable } from 'rxjs';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    /* Para jwt por cookie con withCredentials inserta las cookies en las peticiones automáticamente
    req = req.clone({
      withCredentials: true,
    });
    */

    /*jwt por Authorization Bearer token en header*/
    const user = this.storageService.getUser();
    if (user && Object.keys(user).length) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${user.token}` },
      });
    }
    return next.handle(req);
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
