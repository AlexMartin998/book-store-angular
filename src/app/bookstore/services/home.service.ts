import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

import { Book, BookPage } from 'src/app/shared/interfaces';
import { environment } from 'src/environments/environment';
import { PaymentOrderResponse } from '../shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly baseUrl: string = environment.baseUrl;

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

  // // PayPal
  createPaymentOrder(bookIds: number[]): Observable<PaymentOrderResponse> {
    const basePath = location.origin;

    const body = {
      bookIds,
      successUrl: `${basePath}/cart`,
      cancelUrl: basePath,
    };

    return this.http.post<PaymentOrderResponse>(
      `${this.baseUrl}/home/checkout/payment-order`,
      body
    );
  }

  capturePaymentOrder(paymentOrderId: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/home/checkout/capture-payment?paymentOrderId=${paymentOrderId}`,
      null
    );
  }
}
