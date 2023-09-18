import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BookPage } from 'src/app/admin/shared/interfaces';
import { BooksService } from '../../services/books.service';

// TODO: paging based on QueryParams (URL)

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

  constructor(
    private readonly booksService: BooksService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.booksService.findAll(5, 0).subscribe((bookPage) => {
      this.bookPage = bookPage;
    });
  }

  refreshBookPage() {
    this.booksService
      .findAll(5, 0)
      .subscribe((bookPage) => (this.bookPage = bookPage));
  }

  paginateBooks(event: PageEvent) {
    const page = event.pageIndex;
    const size = event.pageSize;

    this.booksService
      .findAll(size, page)
      .subscribe((bookPage) => (this.bookPage = bookPage));
  }

  delete(bookId: number) {
    alert(
      'Action not allowed in this Demo, to view it please clone the repository and build the project with docker.'
    );
    return;

    if (!confirm('¿Estás seguro de eliminar este libro?')) return;

    this.booksService.delete(bookId).subscribe({
      next: () => {
        this.showSnackbar('Book successfully deleted');
        this.refreshBookPage();
      },
      error: (errorMessage) => this.showSnackbar(errorMessage),
    });
  }

  private showSnackbar(message: string): void {
    this.snackbar.open(message, 'done', {
      duration: 2700,
      panelClass: ['redNoMatch'],
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
    });
  }
}
