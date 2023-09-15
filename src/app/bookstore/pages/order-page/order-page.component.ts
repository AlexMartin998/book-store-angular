import { Component, OnInit } from '@angular/core';

import { Book, PurchaseOrder } from 'src/app/shared/interfaces';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
})
export class OrderPageComponent implements OnInit {
  public books: Book[] = [];
  public order?: PurchaseOrder;

  constructor(private readonly ordersService: OrdersService) {}

  ngOnInit(): void {
    this.ordersService.findOne(21).subscribe((order) => {
      this.order = order;

      order.orderItems.forEach(({ book }) => {
        this.books.push(book);
      });
    });
  }

  onDownload(bookId: number) {
    console.log(bookId);
  }
}
