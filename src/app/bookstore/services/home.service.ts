import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

import { Book } from 'src/app/shared/interfaces';
import { BookPage } from '../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly baseUrl: string = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) {}

  findLatestBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/home/books/latest-published`);
  }

  findAll(size: number = 10, page: number = 0): Observable<BookPage> {
    const params = new HttpParams().set('page', page).set('size', size);

    return this.http.get<BookPage>(`${this.baseUrl}/home/books`, {
      params,
    });
  }

  findOneBySlug(slug: string): Observable<Book> {
    return this.http
      .get<Book>(`${this.baseUrl}/home/books/${slug}`)
      .pipe(catchError((err) => throwError(() => err?.error?.message)));
  }
}
