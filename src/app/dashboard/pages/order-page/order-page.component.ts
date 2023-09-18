import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { OrderItem, PurchaseOrder } from 'src/app/shared/interfaces';
import { OrdersService } from '../../services/orders.service';
import { PaymentStatus } from '../../shared/interfaces';

@Component({
  selector: 'dashboard-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
})
export class OrderPageComponent implements OnInit {
  public order!: PurchaseOrder;

  constructor(
    private readonly ordersService: OrdersService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.ordersService.findOne(id)))
      .subscribe({
        next: (order) => {
          this.order = order;
        },
        error: (errorMessage) => {
          this.showSnackbar(errorMessage);
          this.router.navigateByUrl('/');
        },
      });
  }

  get isPaid() {
    return this.order.paymentStatus == PaymentStatus.PAID;
  }

  onDownload(orderItem: OrderItem) {
    if (orderItem.downloadsAvailable <= 0) return;

    alert(
      'Downloads are not allowed in this Demo, to view it please clone the repository and build the project with docker.'
    );
    return null as any;

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

  private showSnackbar(message: string): void {
    this.snackbar.open(message, 'done', {
      duration: 2700,
      panelClass: ['redNoMatch'],
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
    });
  }
}
