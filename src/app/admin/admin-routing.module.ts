import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookListPageComponent } from './books/pages/book-list-page/book-list-page.component';
import { SaveBookPageComponent } from './books/pages/save-book-page/save-book-page.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { OrderListComponent } from './orders/pages/order-list/order-list.component';
import { OrderPageComponent } from './orders/pages/order-page/order-page.component';
import { UserListComponent } from './users/pages/user-list/user-list.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'books',
        children: [
          { path: '', component: BookListPageComponent },
          {
            path: 'new',
            component: SaveBookPageComponent,
          },
          {
            path: 'edit/:slug',
            component: SaveBookPageComponent,
          },
        ],
      },

      {
        path: 'orders',
        children: [
          { path: '', component: OrderListComponent },
          { path: ':id', component: OrderPageComponent },
        ],
      },

      {
        path: 'users',
        children: [{ path: '', component: UserListComponent }],
      },

      { path: '**', redirectTo: 'books' }, // /admin -> /admin/books
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
