import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { BookPage } from '../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  getBooks(page: number, size: number): Observable<BookPage> {
    const params = new HttpParams().set('page', page).set('size', size);

    return this.http.get<BookPage>('http://localhost:3000/api/v1/home/books', {
      params,
    });
  }
}
