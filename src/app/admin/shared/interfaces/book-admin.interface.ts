import { Category } from './';

export interface Book {
  id?: number;
  title: string;
  price: number;
  slug: string;
  description: string;
  coverPath: string;
  filePath: string;
  category?: Category;
  categoryId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
