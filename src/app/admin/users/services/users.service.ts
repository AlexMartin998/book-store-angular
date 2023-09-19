import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { UserPage } from '../../shared/interfaces';

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
}
