import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Role, User, UserPage } from '../../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  findAll(size: number = 10, page: number = 0): Observable<UserPage> {
    const params = new HttpParams().set('page', page).set('size', size);

    return this.http.get<UserPage>(`${this.baseUrl}/users`, { params });
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.baseUrl}/auth/roles`);
  }

  findOne(id: number): Observable<User> {
    return this.http
      .get<User>(`${this.baseUrl}/users/${id}`)
      .pipe(catchError((err) => throwError(() => err?.error?.message)));
  }

  create(user: User): Observable<User> {
    throw new Error('Method not implemented.');
  }

  update(user: User): Observable<User> {
    return this.http.patch<User>(`${this.baseUrl}/users/${user.id}`, user);
  }
}
