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

  constructor(private readonly homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.findAll().subscribe(({ books, pageNumber }) => {
      this.books = books;
      this.currentPage = pageNumber;
    });
  }
}
