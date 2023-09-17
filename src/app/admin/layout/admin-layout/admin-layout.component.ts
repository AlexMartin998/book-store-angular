import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
})
export class AdminLayoutComponent {
  public sidebarItems = [
    { label: 'Home', icon: 'home', url: '/' },
    { label: 'Books', icon: 'library_books', url: '/admin/books' },
    { label: 'Orders', icon: 'confirmation_number', url: '/admin/orders' },
    { label: 'Users', icon: 'supervisor_account', url: '/admin/users' },
  ];

  constructor(
    private readonly authService: AuthService,
    private router: Router
  ) {}

  get user(): User | undefined {
    return this.authService.currentUser;
  }

  onLogout(): void {
    this.authService.logout();

    // with signals this navigation is not necessary
    this.router.navigateByUrl('/');
  }
}
