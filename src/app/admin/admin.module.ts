import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { AdminRoutingModule } from './admin-routing.module';
import { BookListPageComponent } from './books/pages/book-list-page/book-list-page.component';
import { SaveBookPageComponent } from './books/pages/save-book-page/save-book-page.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';

@NgModule({
  declarations: [
    BookListPageComponent,
    AdminLayoutComponent,
    SaveBookPageComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class AdminModule {}
