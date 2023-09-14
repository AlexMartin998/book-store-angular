import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent {
  constructor(private readonly cartService: CartService) {}

  get items() {
    return this.cartService.items;
  }

  get totalAmount() {
    return this.items.map((i) => i.price).reduce((p1, p2) => p1 + p2, 0);
  }

  remove(bookId: number) {
    this.cartService.removeItem(bookId);
  }
}
