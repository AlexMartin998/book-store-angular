import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { BookstoreRoutingModule } from './bookstore-routing.module';

import { BookCardComponent } from './components/book-card/book-card.component';
import { ShopLayoutComponent } from './layouts/shop-layout/shop-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { BookDetailPageComponent } from './pages/book-detail-page/book-detail-page.component';

@NgModule({
  declarations: [HomePageComponent, ShopLayoutComponent, BookCardComponent, BookDetailPageComponent],
  imports: [CommonModule, BookstoreRoutingModule, SharedModule, MaterialModule],
})
export class BookstoreModule {}
