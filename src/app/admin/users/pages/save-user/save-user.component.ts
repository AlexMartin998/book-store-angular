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
    email: ['', Validators.required],
    password: ['', Validators.required],
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
          console.log(errorMessage);
          return this.router.navigateByUrl('/admin/users');
        },
      });
  }

  get currentUser(): User {
    return this.form.value as User;
  }

  onSubmit() {
    if (this.form.invalid) return this.form.markAllAsTouched();

    const protectedUsers = [1, 2, 3];
    if (protectedUsers.includes(this.currentUser.id))
      return alert(
        'This action is not allowed in this Demo, to view it please clone the repository and build the project with docker.'
      );

    if (this.currentUser?.id) {
      return this.usersService
        .update({ ...this.currentUser })
        .subscribe((user) => {
          // show snackbar
          this.showSnackbar(`${this.currentUser.firstname} updated`);

          this.router.navigateByUrl('/admin/users');
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

  private showSnackbar(message: string): void {
    this.snackbar.open(message, 'done', {
      duration: 2700,
      panelClass: ['redNoMatch'],
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
    });
  }
}
