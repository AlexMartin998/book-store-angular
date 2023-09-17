import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { BookListPageComponent } from './books/pages/book-list-page/book-list-page.component';
import { SaveBookPageComponent } from './books/pages/save-book-page/save-book-page.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { OrderListComponent } from './orders/pages/order-list/order-list.component';
import { OrderPageComponent } from './orders/pages/order-page/order-page.component';
import { UserListComponent } from './users/pages/user-list/user-list.component';

@NgModule({
  declarations: [
    BookListPageComponent,
    AdminLayoutComponent,
    SaveBookPageComponent,
    OrderListComponent,
    OrderPageComponent,
    UserListComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
  ],
})
export class AdminModule {}
