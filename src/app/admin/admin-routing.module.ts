import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookListPageComponent } from './books/pages/book-list-page/book-list-page.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'books', component: BookListPageComponent },

      { path: '**', redirectTo: 'books' }, // /admin -> /admin/books
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
