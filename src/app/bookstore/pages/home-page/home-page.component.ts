import { Component, OnInit } from '@angular/core';

import { Book } from 'src/app/shared/interfaces';
import { CartService } from '../../services/cart.service';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  private _books: Book[] = [];

  constructor(
    private readonly homeService: HomeService,
    private readonly cartService: CartService
  ) {}

  ngOnInit(): void {
    // books are fetched each time this componets is mounted
    this.homeService.findLatestBooks().subscribe((books) => {
      this._books = books;
    });
  }

  get books() {
    return this._books;
  }
}
