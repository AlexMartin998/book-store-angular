import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Category } from 'src/app/admin/shared/interfaces';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'admin-save-book-page',
  templateUrl: './save-book-page.component.html',
  styles: [],
})
export class SaveBookPageComponent implements OnInit {
  public categories: Category[] = [];

  public saveBookForm: FormGroup = this.fb.group({
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
    private readonly booksService: BooksService
  ) {}

  ngOnInit(): void {
    this.booksService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  onSubmit() {
    if (this.saveBookForm.invalid) return this.saveBookForm.markAllAsTouched();

    console.log(this.saveBookForm.value);
    return;
  }
}
