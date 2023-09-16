import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

import { AuthService } from 'src/app/auth/services/auth.service';
import { PurchaseOrder } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private readonly baseUrl: string = 'http://localhost:3000/api/v1';

  private http = inject(HttpClient);
  private authService = inject(AuthService);

  get authUser() {
    return this.authService.currentUser;
  }

  findOne(orderId: number): Observable<PurchaseOrder> {
    return this.http
      .get<PurchaseOrder>(
        `${this.baseUrl}/orders/${orderId}/customer/${this.authUser?.id}`
      )
      .pipe(catchError((err) => throwError(() => err?.error?.message)));
  }

  findAllByCustomer(size: number = 10, page: number = 0): Observable<any> {
    const params = new HttpParams().set('page', page).set('size', size);

    return this.http.get(`${this.baseUrl}/orders`, { params });
  }

  downloadBookBasedOnOrderItem(
    orderId: number,
    itemId: number
  ): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/orders/${orderId}/items/${itemId}/books/download`,
      {
        responseType: 'blob', // api returns a binary
      }
    );
  }
}
