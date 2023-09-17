import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

import {
  Book,
  BookPage,
  Category,
  FileResponse,
} from '../../shared/interfaces';

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
    return this.http.post<Book>(`${this.baseUrl}/books`, book);
  }

  update(book: Book): Observable<Book> {
    return this.http.patch<Book>(`${this.baseUrl}/books/${book.id}`, book);
  }

  findAll(size: number = 10, page: number = 0): Observable<BookPage> {
    const params = new HttpParams().set('page', page).set('size', size);

    return this.http.get<BookPage>(`${this.baseUrl}/books`, {
      params,
    });
  }

  findOneBySlug(slug: string): Observable<Book> {
    return this.http
      .get<Book>(`${this.baseUrl}/books/slug/${slug}`)
      .pipe(catchError((err) => throwError(() => err?.error?.message)));
  }

  checkSlugAvailability(slug: string): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.baseUrl}/books/availability/slug/${slug}`
    );
  }

  uploadFile(formData: FormData): Observable<FileResponse> {
    return this.http.post<FileResponse>(
      `${this.baseUrl}/media/upload-cloudinary`,
      formData
    );
  }

  delete(bookId: number): Observable<boolean> {
    return this.http
      .delete<boolean>(`${this.baseUrl}/books/${bookId}`)
      .pipe(catchError((err) => throwError(() => err?.error?.message)));
  }
}
