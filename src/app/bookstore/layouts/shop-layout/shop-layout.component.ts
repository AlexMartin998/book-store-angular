import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Book } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-shop-layout',
  templateUrl: './shop-layout.component.html',
  styleUrls: ['./shop-layout.component.css'],
})
export class ShopLayoutComponent {
  constructor(private readonly cartService: CartService) {}

  get cartItems(): Book[] {
    return this.cartService.items;
  }
}
