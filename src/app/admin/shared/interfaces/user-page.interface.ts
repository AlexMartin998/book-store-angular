import { User } from '.';

export interface UserPage {
  users: User[];
  pageNumber: number;
  size: number;
  totalElements: number;
  totalPages: number;
  lastOne: boolean;
}
