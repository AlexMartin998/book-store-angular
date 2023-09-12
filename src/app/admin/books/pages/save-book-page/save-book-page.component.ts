import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';

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
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
    slug: ['', [Validators.required, Validators.pattern('[a-z0-9-]+')]],
    description: ['', [Validators.required]],
    price: ['', [Validators.required, Validators.min(0)]],
    categoryId: ['', [Validators.required, Validators.min(1)]],
    coverPath: ['' /* [Validators.required] */],
    filePath: ['' /* [Validators.required] */],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private readonly booksService: BooksService
  ) {}

  get currentBook(): Book {
    return this.bookForm.value as Book;
  }

  ngOnInit(): void {
    // get categories
    this.booksService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });

    // edit
    if (!this.router.url.includes('edit')) return;
    this.activatedRoute.params
      .pipe(
        switchMap(({ slug }) => this.booksService.findOneBySlug(slug)),
        map((hero) => {
          return { ...hero, categoryId: hero.category?.id };
        })
      )
      .subscribe({
        next: (hero) => this.bookForm.reset(hero),
        error: (errorMessage) => {
          console.log(errorMessage);
          return this.router.navigateByUrl('/admin/books');
        },
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
