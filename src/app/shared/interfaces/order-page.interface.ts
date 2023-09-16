import { OrderItem } from '.';

export interface OrderPage {
  orders: Order[];
  pageNumber: number;
  size: number;
  totalElements: number;
  totalPages: number;
  lastOne: boolean;
}

export interface Order {
  id: number;
  totalAmount: number;
  paymentStatus: string;
  orderItems: OrderItem[];
  customer: Customer;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
}
