import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { BookListPageComponent } from './books/pages/book-list-page/book-list-page.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';

@NgModule({
  declarations: [BookListPageComponent, AdminLayoutComponent],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
