import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  token?: string | null;

  constructor() {
    this.token = localStorage.getItem('token');
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.token) {
      const cloned = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${this.token}`),
      });

      return next.handle(cloned);
    }

    return next.handle(request);
  }
}
