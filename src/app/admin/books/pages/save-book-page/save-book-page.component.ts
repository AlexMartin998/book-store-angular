import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';

import { Book, Category } from 'src/app/admin/shared/interfaces';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'admin-save-book-page',
  templateUrl: './save-book-page.component.html',
  styleUrls: ['./save-book-page.component.css'],
})
export class SaveBookPageComponent implements OnInit {
  public categories: Category[] = [];
  private protectedBooks: number[] = Array.from(
    { length: 12 },
    (_, index) => index + 1
  );

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
    private readonly booksService: BooksService,
    private snackbar: MatSnackBar
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
      if (this.protectedBooks.includes(this.currentBook.id)) {
        alert(
          'These books are protected and cannot be edited. To see this functionality use the book titled `EDTI` or download the repository and build the app locally with Docker.'
        );
        return;
      }

      return this.booksService.update(this.currentBook).subscribe((hero) => {
        // show snackbar
        this.showSnackbar(`${this.currentBook.title} updated`);

        this.router.navigateByUrl('/admin/books');
      });
    }

    this.booksService.create(this.currentBook).subscribe((hero) => {
      this.showSnackbar(
        `The book '${
          this.bookForm.get('title')?.value
        }' was successfully created`
      );

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
    const maxSize = 1024 * 1024 * 10;

    if (file?.size >= maxSize) return alert('Max SIze');

    alert(
      'Uploads are not allowed in this Demo, to view it please clone the repository and build the project with docker.'
    );
    return null as any;

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      this.booksService.uploadFile(formData).subscribe((res) => {
        // set filename as input value
        this.bookForm.controls[control].setValue(res.filename);
      });
    }
  }

  private showSnackbar(message: string): void {
    this.snackbar.open(message, 'done', {
      duration: 2700,
      panelClass: ['redNoMatch'],
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
    });
  }
}
