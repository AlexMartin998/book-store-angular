import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  public form: FormGroup = this.fb.group({
    email: ['alex1@demo.com', [Validators.required, Validators.email]],
    password: ['123qwe123QWE.', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private readonly authService: AuthService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  onLogin() {
    if (this.form.invalid) return;

    this.authService.login(this.form.value).subscribe({
      next: () => {
        this.showWelcomeMessageAndRedirect();
      },
      error: (errorMessage) => {
        this.showSnackbar(errorMessage);
      },
    });
  }

  private showSnackbar(message: string): void {
    this.snackbar.open(message, 'done', {
      duration: 2700,
      panelClass: ['redNoMatch'],
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
    });
  }

  private showWelcomeMessageAndRedirect() {
    const authUser = this.authService.currentUser;
    this.showSnackbar(`Welcome ${authUser!.firstname}`);

    // redirect based on user role
    if (authUser?.role.name === 'ADMIN')
      return this.router.navigateByUrl('/admin/books');

    return this.router.navigateByUrl('/');
  }
}
