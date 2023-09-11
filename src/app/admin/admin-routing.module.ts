import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookListPageComponent } from './books/pages/book-list-page/book-list-page.component';
import { SaveBookPageComponent } from './books/pages/save-book-page/save-book-page.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'books',
        children: [
          { path: '', component: BookListPageComponent },
          {
            path: 'new',
            component: SaveBookPageComponent,
          },
          {
            path: 'edit/:id',
            component: SaveBookPageComponent,
          },
        ],
      },

      { path: '**', redirectTo: 'books' }, // /admin -> /admin/books
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
