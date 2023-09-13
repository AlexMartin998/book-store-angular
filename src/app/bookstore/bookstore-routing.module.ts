import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShopLayoutComponent } from './layouts/shop-layout/shop-layout.component';
import { BookDetailPageComponent } from './pages/book-detail-page/book-detail-page.component';
import { BooksPageComponent } from './pages/books-page/books-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    component: ShopLayoutComponent,
    children: [
      { path: '', component: HomePageComponent },
      { path: 'books', component: BooksPageComponent },
      {
        path: 'book/:slug',
        component: BookDetailPageComponent,
      },
      { path: 'cart', component: CartPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookstoreRoutingModule {}
