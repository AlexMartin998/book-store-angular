import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ShopLayoutComponent } from './layouts/shop-layout/shop-layout.component';

const routes: Routes = [
  {
    path: '',
    component: ShopLayoutComponent,
    children: [{ path: '', component: HomePageComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookstoreRoutingModule {}
