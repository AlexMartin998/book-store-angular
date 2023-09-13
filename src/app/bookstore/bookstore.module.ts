import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { BookstoreRoutingModule } from './bookstore-routing.module';

import { ShopLayoutComponent } from './layouts/shop-layout/shop-layout.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

@NgModule({
  declarations: [HomePageComponent, ShopLayoutComponent],
  imports: [CommonModule, BookstoreRoutingModule, SharedModule, MaterialModule],
})
export class BookstoreModule {}
