import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { Book, Category } from 'src/app/admin/shared/interfaces';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'admin-save-book-page',
  templateUrl: './save-book-page.component.html',
  styles: [],
})
export class SaveBookPageComponent implements OnInit {
  public categories: Category[] = [];

  public bookForm: FormGroup = this.fb.group({
    title: [
      'asssssssss',
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
    slug: ['asa', [Validators.required, Validators.pattern('[a-z0-9-]+')]],
    description: ['asasa', [Validators.required]],
    price: ['12', [Validators.required, Validators.min(0)]],
    categoryId: ['1', [Validators.required, Validators.min(1)]],
    coverPath: ['' /* [Validators.required] */],
    filePath: ['' /* [Validators.required] */],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private readonly booksService: BooksService
  ) {}

  get currentBook(): Book {
    return this.bookForm.value as Book;
  }

  ngOnInit(): void {
    this.booksService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  onSubmit() {
    if (this.bookForm.invalid) return this.bookForm.markAllAsTouched();

    this.booksService.create(this.currentBook).subscribe((hero) => {
      console.log(hero);
      // this.router.navigateByUrl('/admin/books');
    });

    return;
  }
}
