import { Component, OnInit } from '@angular/core';

import { BookPage } from 'src/app/admin/shared/interfaces';
import { BooksService } from '../../services/books.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'admin-book-list-page',
  templateUrl: './book-list-page.component.html',
  styleUrls: ['./book-list-page.component.css'],
})
export class BookListPageComponent implements OnInit {
  public bookPage?: BookPage;
  public displayedColumns: string[] = [
    'title',
    'price',
    'createdAt',
    'status',
    'actions',
  ];

  constructor(private readonly booksService: BooksService) {}

  ngOnInit(): void {
    this.booksService.findAll(10, 0).subscribe((bookPage) => {
      this.bookPage = bookPage;
    });
  }

  get books() {
    return this.bookPage?.books;
  }

  paginateBooks(event: PageEvent) {
    const page = event.pageIndex;
    const size = event.pageSize;

    this.booksService
      .findAll(size, page)
      .subscribe((bookPage) => (this.bookPage = bookPage));
  }
}
