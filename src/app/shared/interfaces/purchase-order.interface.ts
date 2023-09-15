import { Book } from './book.interface';

export interface PurchaseOrder {
  id: number;
  totalAmount: number;
  paymentStatus: string;
  orderItems: OrderItem[];
  createdAt?: string;
  updatedAt?: string;
}

export interface OrderItem {
  id: number;
  priceAtPurchase: number;
  book: Book;
}
