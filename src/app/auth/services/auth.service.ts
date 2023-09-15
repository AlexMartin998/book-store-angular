import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

import { LocalStorageEnum, User } from 'src/app/shared/interfaces';
import { LoginResponse } from '../helpers/interfaces/login-response';
import { AuthStatus, LoginCredentials } from './interfaces';

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

  private setAuthentication(user: User, token: string): boolean {
    this._currentUser = user;
    this._authStatus = AuthStatus.authenticated;

    localStorage.setItem(LocalStorageEnum.authJWTKey, token);

    return true;
  }
}
