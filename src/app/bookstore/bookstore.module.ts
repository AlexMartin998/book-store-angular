import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { BookstoreRoutingModule } from './bookstore-routing.module';

import { BookCardComponent } from './components/book-card/book-card.component';
import { ShopLayoutComponent } from './layouts/shop-layout/shop-layout.component';
import { BookDetailPageComponent } from './pages/book-detail-page/book-detail-page.component';
import { BooksPageComponent } from './pages/books-page/books-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';

@NgModule({
  declarations: [
    HomePageComponent,
    ShopLayoutComponent,
    BookCardComponent,
    BookDetailPageComponent,
    BooksPageComponent,
    CartPageComponent,
  ],
  imports: [
    CommonModule,
    BookstoreRoutingModule,
    SharedModule,
    MaterialModule,
    InfiniteScrollModule,
  ],
})
export class BookstoreModule {}
