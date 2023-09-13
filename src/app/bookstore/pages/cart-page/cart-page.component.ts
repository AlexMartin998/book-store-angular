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

  remove(bookId: number) {
    this.cartService.removeItem(bookId);
  }
}
