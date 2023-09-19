import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';

import { Role, User } from 'src/app/admin/shared/interfaces';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-save-user',
  templateUrl: './save-user.component.html',
  styleUrls: ['./save-user.component.css'],
})
export class SaveUserComponent implements OnInit {
  public roles: Role[] = [];

  public form: FormGroup = this.fb.group({
    id: [''], // save/upd
    firstname: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(21)],
    ],
    lastname: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(21)],
    ],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&.])[A-Za-z\\d@$!%*?&.]{8,}$'
        ),
      ],
    ],
    roleId: ['', [Validators.required, Validators.min(1)]], // select
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private readonly usersService: UsersService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // get roles
    this.usersService.getRoles().subscribe((roles) => {
      this.roles = roles;
    });

    // edit
    if (!this.router.url.includes('edit')) return;
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.usersService.findOne(id)),
        map((user) => {
          return {
            ...user,
            roleId: user.role.id,
          };
        })
      )
      .subscribe({
        next: (user) => {
          this.form.reset(user);
        },
        error: (errorMessage) => {
          this.showSnackbar(errorMessage);
          return this.router.navigateByUrl('/admin/users');
        },
      });
  }

  get currentUser(): User {
    return this.form.value as User;
  }

  onSubmit() {
    const password = this.form.get('password');
    if (!password?.value) {
      password?.setErrors({ passwordPattern: true });
      password?.markAsTouched();
    }

    if (this.form.invalid) return this.form.markAllAsTouched();

    if (this.currentUser?.id) {
      return this.usersService.update({ ...this.currentUser }).subscribe({
        next: (user) => {
          // show snackbar
          this.showSnackbar(`${this.currentUser.firstname} updated`);

          this.router.navigateByUrl('/admin/users');
        },
        error: (errorMessage) => {
          this.showSnackbar(errorMessage);
          return this.router.navigateByUrl('/admin/users');
        },
      });
    }

    this.usersService.create(this.currentUser).subscribe((user) => {
      this.showSnackbar(
        `User '${this.form.get('title')?.value}' was successfully created`
      );

      this.router.navigateByUrl('/admin/users');
    });

    return;
  }

  private showSnackbar(message: string | string[]): void {
    if (message instanceof Array) {
      message.forEach((errorMessage) => {
        this.snackbar.open(errorMessage, 'done', {
          duration: 3600,
          panelClass: ['redNoMatch'],
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
        });
      });

      return;
    }

    this.snackbar.open(message, 'done', {
      duration: 2700,
      panelClass: ['redNoMatch'],
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
    });
  }
}
