import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

import { AuthService } from 'src/app/auth/services/auth.service';
import { PurchaseOrder } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private readonly baseUrl: string = environment.baseUrl;

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

    return this.http.get(`${this.baseUrl}/orders/customer`, { params });
  }

  downloadBookBasedOnOrderItem(
    orderId: number,
    itemId: number
  ): Observable<any> {
    alert(
      'Downloads are not allowed in this Demo, to view it please clone the repository and build the project with docker.'
    );
    return null as any;

    return this.http.get(
      `${this.baseUrl}/orders/${orderId}/items/${itemId}/books/download`,
      {
        responseType: 'blob', // api returns a binary
      }
    );
  }
}
