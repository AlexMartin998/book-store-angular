import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../services/users.service';
import { UserPage } from 'src/app/admin/shared/interfaces';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  public userPage?: UserPage;
  // table
  public displayedColumns: string[] = [
    'id',
    'firstname',
    'lastname',
    'email',
    'status',
    'role',
    'actions',
  ];

  constructor(private readonly usersService: UsersService) {}

  ngOnInit(): void {
    this.usersService
      .findAll()
      .subscribe((userPage) => (this.userPage = userPage));
  }

  paginateUsers(event: PageEvent) {
    const page = event.pageIndex;
    const size = event.pageSize;

    this.usersService
      .findAll(size, page)
      .subscribe((userPage) => (this.userPage = userPage));
  }

  delete(id: number) {
    //
  }
}
