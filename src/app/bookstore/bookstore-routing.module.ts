import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopLayoutComponent } from './layouts/shop-layout/shop-layout.component';

import { BookDetailPageComponent } from './pages/book-detail-page/book-detail-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    component: ShopLayoutComponent,
    children: [
      { path: '', component: HomePageComponent },
      {
        path: 'book/:slug',
        component: BookDetailPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookstoreRoutingModule {}
