import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'admin-save-book-page',
  templateUrl: './save-book-page.component.html',
  styles: [],
})
export class SaveBookPageComponent {
  public saveBookForm: FormGroup = this.fb.group({
    title: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
    slug: ['', [Validators.required, Validators.pattern('[a-z0-9-]+')]],
    description: ['', [Validators.required]],
    price: ['', [Validators.required, Validators.min(0)]],
    coverPath: ['', [Validators.required]],
    filePath: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    console.log(this.saveBookForm.value);
  }
}
