import { Component, OnInit } from '@angular/core';

import { HomeService } from '../../services/home.service';
import { Book } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styles: [],
})
export class HomePageComponent implements OnInit {
  private _books: Book[] = [];

  constructor(private readonly homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.getLatestBooks().subscribe((books) => {
      this._books = books;
    });
  }

  get books() {
    return this._books;
  }
}
