import { Book } from '.';

export interface BookPage {
  books: Book[];
  pageNumber: number;
  size: number;
  totalElements: number;
  totalPages: number;
  lastOne: boolean;
}
