import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../../shared/interfaces/category.interface';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private readonly baseUrl: string = 'http://localhost:3000/api/v1';

  private http = inject(HttpClient);

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/home/categories`);
  }
}
