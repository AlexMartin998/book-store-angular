import { Component, Input } from '@angular/core';

import { Book } from 'src/app/shared/interfaces';

@Component({
  selector: 'bookstore-book-card',
  templateUrl: './book-card.component.html',
  styles: [],
})
export class BookCardComponent {
  @Input()
  public book!: Book;
}
