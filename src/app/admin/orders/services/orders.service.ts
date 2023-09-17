import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

import { PurchaseOrder } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private readonly baseUrl: string = environment.baseUrl;

  private http = inject(HttpClient);

  constructor() {}

  findAll(size: number = 10, page: number = 0): Observable<any> {
    const params = new HttpParams().set('page', page).set('size', size);

    return this.http
      .get<PurchaseOrder>(`${this.baseUrl}/orders`, { params })
      .pipe(catchError((err) => throwError(() => err?.error?.message)));
  }

  findOne(orderId: number): Observable<PurchaseOrder> {
    return this.http
      .get<PurchaseOrder>(`${this.baseUrl}/orders/${orderId}`)
      .pipe(catchError((err) => throwError(() => err?.error?.message)));
  }
}
