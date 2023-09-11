import { Book } from 'src/app/shared/interfaces';

export interface BookPage {
  books: Book[];
  pageNumber: number;
  size: number;
  totalElements: number;
  totalPages: number;
  lastOne: boolean;
}
