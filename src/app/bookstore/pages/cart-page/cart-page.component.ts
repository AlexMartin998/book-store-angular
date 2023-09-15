import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CartService } from '../../services/cart.service';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  public isPaymentBeingProcessed: boolean = false;
  public orderSuccess: boolean = false;

  constructor(
    private readonly cartService: CartService,
    private readonly homeService: HomeService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token = this.activatedRoute.snapshot.queryParamMap.get('token');
    if (!token) return;

    this.isPaymentBeingProcessed = true;
    this.orderSuccess = true;

    this.homeService.capturePaymentOrder(token).subscribe((res) => {
      if (!res.completed) return;

      this.cartService.clear();
      // this.router.navigate(['/orders', res.orderId]);
      this.router.navigate(['/books']);
    });
  }

  get items() {
    return this.cartService.items;
  }

  get totalAmount() {
    return this.items.map((i) => i.price).reduce((p1, p2) => p1 + p2, 0);
  }

  remove(bookId: number) {
    this.cartService.removeItem(bookId);
  }

  //
  pay() {
    this.isPaymentBeingProcessed = true;
    if (!this.isPaymentBeingProcessed) return;

    const bookIds = this.items.map((item) => item.id);

    this.homeService.createPaymentOrder(bookIds).subscribe((res) => {
      if (res.approveUrl) {
        window.location = res.approveUrl as any;
      }
    });
  }
}
