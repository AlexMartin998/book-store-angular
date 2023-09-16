import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { PaymentStatus } from 'src/app/dashboard/shared/interfaces';
import { PurchaseOrder } from 'src/app/shared/interfaces';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'admin-order-page',
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

  private showSnackbar(message: string): void {
    this.snackbar.open(message, 'done', {
      duration: 2700,
      panelClass: ['redNoMatch'],
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
    });
  }
}
