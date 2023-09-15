import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/services/auth.service';
import { Book, User } from 'src/app/shared/interfaces';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-shop-layout',
  templateUrl: './shop-layout.component.html',
  styleUrls: ['./shop-layout.component.css'],
})
export class ShopLayoutComponent {
  constructor(
    private readonly cartService: CartService,
    private readonly authService: AuthService,
    private router: Router
  ) {}

  get cartItems(): Book[] {
    return this.cartService.items;
  }

  get user(): User | undefined {
    return this.authService.currentUser;
  }

  onLogout(): void {
    this.authService.logout();

    // with signals this navigation is not required
    this.router.navigateByUrl('/');
  }
}
