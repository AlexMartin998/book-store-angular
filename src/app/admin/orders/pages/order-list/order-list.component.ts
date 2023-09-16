import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { OrderPage } from 'src/app/shared/interfaces';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  public orderPage?: OrderPage;

  // table
  public displayedColumns: string[] = [
    'id',
    'fullname',
    'date',
    'totalAmount',
    'status',
    'actions',
  ];

  constructor(private readonly ordersService: OrdersService) {}

  ngOnInit(): void {
    this.ordersService
      .findAll()
      .subscribe((orderPage) => (this.orderPage = orderPage));
  }

  paginateOrders(event: PageEvent) {
    const page = event.pageIndex;
    const size = event.pageSize;

    this.ordersService
      .findAll(size, page)
      .subscribe((orderPage) => (this.orderPage = orderPage));
  }
}
