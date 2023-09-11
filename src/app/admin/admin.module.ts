import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { BookListPageComponent } from './books/pages/book-list-page/book-list-page.component';

@NgModule({
  declarations: [BookListPageComponent],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
