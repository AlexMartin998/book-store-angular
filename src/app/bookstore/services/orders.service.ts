import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { PurchaseOrder } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private readonly baseUrl: string = 'http://localhost:3000/api/v1';

  private http = inject(HttpClient);

  findOne(orderId: number): Observable<PurchaseOrder> {
    return this.http.get<PurchaseOrder>(`${this.baseUrl}/orders/${orderId}`);
  }
}
