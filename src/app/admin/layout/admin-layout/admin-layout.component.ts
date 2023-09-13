import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
})
export class AdminLayoutComponent {
  public sidebarItems = [
    { label: 'Home', icon: 'home', url: '/' },
    { label: 'Books', icon: 'library_books', url: '/admin/books' },
    { label: 'Users', icon: 'supervisor_account', url: '/new' },
  ];
}
