import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { LocalStorageEnum } from 'src/app/shared/interfaces';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  token?: string | null;

  constructor() {
    this.token = localStorage.getItem(LocalStorageEnum.authJWTKey);
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.token = localStorage.getItem(LocalStorageEnum.authJWTKey); // al ya estar montado tras login no lo vuelve a tomar

    if (this.token) {
      const cloned = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${this.token}`),
      });

      return next.handle(cloned);
    }

    return next.handle(request);
  }
}
