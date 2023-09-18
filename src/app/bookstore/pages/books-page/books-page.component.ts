import { Component, OnInit } from '@angular/core';

import { Book } from 'src/app/shared/interfaces';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-books-page',
  templateUrl: './books-page.component.html',
  styles: [],
})
export class BooksPageComponent implements OnInit {
  public books: Book[] = [];
  public currentPage: number = 0;
  public isLoadingBooks: boolean = true;

  constructor(private readonly homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.findAll(6).subscribe(({ books, pageNumber }) => {
      this.books = books;
      this.currentPage = pageNumber;
      this.isLoadingBooks = false;

    });
  }

  onScroll() {
    this.homeService
      .findAll(6, this.currentPage + 1)
      .subscribe(({ books, pageNumber }) => {
        this.books.push(...books);
        this.currentPage = pageNumber;
      });
  }
}
