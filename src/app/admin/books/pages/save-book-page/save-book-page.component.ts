import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';

import { of } from 'rxjs';
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
    id: [''],
    title: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
    slug: ['', [Validators.required, Validators.pattern('[a-z0-9-]+')]],
    description: ['', [Validators.required]],
    price: ['', [Validators.required, Validators.min(0)]],
    categoryId: ['', [Validators.required, Validators.min(1)]],
    coverPath: ['', [Validators.required]],
    filePath: ['', [Validators.required]],
  });

  // // Debounce
  private slugChanged: boolean = false;
  private originalSlug?: string;

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
        map((book) => {
          this.originalSlug = book.slug; // allow to return to original title
          return { ...book, categoryId: book.category?.id };
        })
      )
      .subscribe({
        next: (book) => {
          this.bookForm.reset(book);
        },
        error: (errorMessage) => {
          console.log(errorMessage);
          return this.router.navigateByUrl('/admin/books');
        },
      });

    // // Debounce
    const titleControl = this.bookForm.controls['slug'];

    titleControl.valueChanges
      .pipe(
        debounceTime(540),
        distinctUntilChanged(), // prevent duplicate or consecutive values from being issued from the observable
        tap(() => (this.slugChanged = true)),
        switchMap((slug) => {
          if (!this.slugChanged || slug === this.originalSlug || !slug)
            return of(null);

          return this.booksService.checkSlugAvailability(slug);
        })
      )
      .subscribe((alreadyTaken) => {
        if (!alreadyTaken) return;

        const slugControl = this.bookForm.get('slug');
        slugControl?.setErrors({ slugNotAvailable: true });
        slugControl?.markAsTouched();
      });
  }

  onSubmit() {
    if (this.bookForm.invalid) return this.bookForm.markAllAsTouched();

    // update
    if (this.currentBook?.id) {
      return this.booksService.update(this.currentBook).subscribe((hero) => {
        // show snackbar

        this.router.navigateByUrl('/admin/books');
      });
    }

    this.booksService.create(this.currentBook).subscribe((hero) => {
      this.router.navigateByUrl('/admin/books');
    });

    return;
  }

  createSlug() {
    const title: string = this.bookForm.controls['title'].value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, '-') // Replace invalid characters with -
      .replace(/^-+|-+$/g, '') // Removes hyphens at the beginning or at the end
      .replace(/-+/g, '-'); // Replaces multiple - with a single -

    this.bookForm.controls['slug'].setValue(slug);
  }

  uploadFile(event: any, control: string) {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      console.log(`${file.name} was successfully uploaded`);

      this.booksService.uploadFile(formData).subscribe((res) => {
        // set filename as input value
        this.bookForm.controls[control].setValue(res.filename);
      });
    }
  }
}
