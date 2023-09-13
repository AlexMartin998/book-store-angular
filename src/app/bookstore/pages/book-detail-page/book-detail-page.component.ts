import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { Book } from 'src/app/shared/interfaces';
import { CartService } from '../../services/cart.service';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-book-detail-page',
  templateUrl: './book-detail-page.component.html',
  styles: [],
})
export class BookDetailPageComponent implements OnInit {
  public book?: Book;

  constructor(
    private readonly homeService: HomeService,
    private readonly cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ slug }) => this.homeService.findOneBySlug(slug)))
      .subscribe({
        next: (book) => {
          this.book = book;
        },
        error: (err) => {
          // show error
          return this.router.navigateByUrl('/');
        },
      });
  }

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
