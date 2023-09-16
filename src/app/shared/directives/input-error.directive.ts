import { Directive, ElementRef, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[inputError]',
})
export class InputErrorDirective {
  // to have full control over the HTML Element that implements it
  private htmlHostElement?: ElementRef<HTMLElement>;

  // receiving errors from the input html
  private _errors?: ValidationErrors | null;
  @Input() set errors(value: ValidationErrors | null | undefined) {
    this._errors = value;

    // called every time errors change
    this.handleErrorMessage();
  }

  // receiving input
  private _inputName?: string | null;
  @Input() set inputName(name: string | null) {
    this._inputName = name;
  }

  constructor(private el: ElementRef<HTMLElement>) {
    this.htmlHostElement = el;
  }

  handleErrorMessage(): void {
    if (!this.htmlHostElement) return;

    // if there are NO errors, clean err messages
    if (!this._errors) {
      this.htmlHostElement.nativeElement.innerText = '';
      return;
    }

    // set error messages
    const errors = Object.keys(this._errors);
    if (errors.includes('required'))
      return this.setErrorMessage(`${this._inputName} is required`);
    if (errors.includes('minlength'))
      return this.setErrorMessage(
        `${this._inputName} must have al least ${this._errors['minlength']['requiredLength']} characters`
      );
    if (errors.includes('email'))
      return this.setErrorMessage('Invalid eamil format');
    if (errors.includes('slugNotAvailable'))
      return this.setErrorMessage('Slug already taken');
  }

  private setErrorMessage(errorMessage: string) {
    this.htmlHostElement!.nativeElement.textContent = errorMessage;
  }
}
