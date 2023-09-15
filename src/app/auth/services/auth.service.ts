import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, throwError } from 'rxjs';

import { LocalStorageEnum, User } from 'src/app/shared/interfaces';
import {
  AuthStatus,
  LoginCredentials,
  LoginResponse,
  RenewTokenResponse,
} from '../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl: string = 'http://localhost:3000/api/v1';
  private _currentUser?: User;
  private _authStatus: AuthStatus = AuthStatus.checking;

  constructor(private http: HttpClient) {}

  get currentUser() {
    return this._currentUser;
  }

  get authStatus() {
    return this._authStatus;
  }

  login(loginCredentials: LoginCredentials): Observable<boolean> {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/auth/login`, loginCredentials)
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token)),
        catchError((error) => throwError(() => error.error.message))
      );
  }

  checkAuthStatus(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      this._authStatus = AuthStatus.notAuthenticated;
      // this.logout();
      return of(false);
    }

    return this.http
      .get<RenewTokenResponse>(`${this.baseUrl}/auth/renew-token`)
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token)),
        catchError(() => {
          this._authStatus = AuthStatus.notAuthenticated;

          return of(false);
        })
      );
  }

  private setAuthentication(user: User, token: string): boolean {
    this._currentUser = user;
    this._authStatus = AuthStatus.authenticated;

    localStorage.setItem(LocalStorageEnum.authJWTKey, token);

    return true;
  }
}
