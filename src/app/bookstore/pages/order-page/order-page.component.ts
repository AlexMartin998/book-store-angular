import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { PurchaseOrder } from 'src/app/shared/interfaces';
import { OrderItem } from '../../../shared/interfaces/purchase-order.interface';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
})
export class OrderPageComponent implements OnInit {
  public order!: PurchaseOrder;

  constructor(
    private readonly ordersService: OrdersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.ordersService.findOne(id)))
      .subscribe({
        next: (order) => {
          this.order = order;
        },
        error: (error) => {
          this.router.navigateByUrl('/');
        },
      });
  }

  onDownload(orderItem: OrderItem) {
    if (orderItem.downloadsAvailable <= 0) return;

    this.ordersService
      .downloadBookBasedOnOrderItem(this.order.id, orderItem.id)
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
