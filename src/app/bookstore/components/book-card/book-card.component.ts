import { Component, Input } from '@angular/core';

import { Book } from 'src/app/shared/interfaces';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'bookstore-book-card',
  templateUrl: './book-card.component.html',
  styles: [],
})
export class BookCardComponent {
  @Input()
  public book!: Book;

  constructor(private readonly cartService: CartService) {}

  addBookToCart(book: Book) {
    this.cartService.addItem(book);
  }

  removeBookFromCart(bookId: number) {
    this.cartService.removeItem(bookId);
  }

  existsBookInCart(bookId: number) {
    return this.cartService.existsById(bookId);
  }
}
