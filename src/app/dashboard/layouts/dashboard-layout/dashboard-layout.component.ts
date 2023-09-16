import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/services/auth.service';
import { AuthStatus } from 'src/app/auth/shared/interfaces';
import { CartService } from 'src/app/bookstore/services/cart.service';
import { Book, User } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css'],
})
export class DashboardLayoutComponent {
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

  get isChecking(): boolean {
    return this.authService.authStatus === AuthStatus.checking;
  }

  get isAdmin(): boolean {
    return this.authService.isAdmin;
  }

  onLogout(): void {
    this.authService.logout();

    // with signals this navigation is not required
    this.router.navigateByUrl('/');
  }
}
