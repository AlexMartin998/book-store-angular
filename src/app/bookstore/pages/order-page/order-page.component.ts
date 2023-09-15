import { Component, OnInit } from '@angular/core';

import { Book, PurchaseOrder } from 'src/app/shared/interfaces';
import { OrdersService } from '../../services/orders.service';
import { OrderItem } from '../../../shared/interfaces/purchase-order.interface';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
})
export class OrderPageComponent implements OnInit {
  public books: Book[] = [];
  public order?: PurchaseOrder;
  public orderItems: OrderItem[] = [];

  constructor(private readonly ordersService: OrdersService) {}

  ngOnInit(): void {
    this.ordersService.findOne(21).subscribe((order) => {
      this.order = order;
      this.orderItems = order.orderItems;

      order.orderItems.forEach(({ book }) => {
        this.books.push(book);
      });
    });
  }

  onDownload(orderItem: OrderItem) {
    if (orderItem.downloadsAvailable <= 0) return;

    this.ordersService
      .downloadBookBasedOnOrderItem(this.order!.id, orderItem.id)
      .subscribe((blob) => {
        // capture binary
        const _blob = new Blob([blob], {
          type: 'application/pdf; chartset=utf-8',
        });

        // download book
        const a = document.createElement('a');
        const url = window.URL.createObjectURL(_blob);

        a.href = url;
        a.download = `${orderItem.book.title}.pdf`;
        a.click();
        URL.revokeObjectURL(url);

        orderItem.downloadsAvailable -= 1;
      });
  }
}
