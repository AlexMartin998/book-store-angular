import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Book } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly baseUrl: string = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) {}

  getLatestBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/home/books/latest-published`);
  }
}
