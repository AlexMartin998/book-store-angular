import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../../../bookstore/services/home.service';
import { Book } from 'src/app/shared/interfaces';

@Component({
  selector: 'admin-book-list-page',
  templateUrl: './book-list-page.component.html',
  styles: [],
})
export class BookListPageComponent implements OnInit {
  public books: Book[] = [];

  constructor(private readonly homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.getBooks(0, 5).subscribe((bookPage) => {
      this.books = bookPage.books;
      console.log(this.books);
    });
  }
}
