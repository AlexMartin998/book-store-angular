import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Book, Category } from '../../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private readonly baseUrl: string = 'http://localhost:3000/api/v1';

  private http = inject(HttpClient);

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/home/categories`);
  }

  create(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.baseUrl}/sadsad`, book);
  }
}
