import { Injectable } from '@angular/core';
import { Book, LocalStorageEnum } from 'src/app/shared/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _items: Book[] = [];

  constructor() {
    this.loadLocalStorage(); // load LS in constructor 'cause service is not a Angular Component that has component lifecycle
  }

  get items() {
    return this._items;
  }

  addItem(book: Book): void {
    this._items.push(book);
    this.saveToLocalStorage();
  }

  removeItem(bookId: number): void {
    this._items = this._items.filter((item) => item.id !== bookId);
    this.saveToLocalStorage();
  }

  clear(): void {
    this._items = [];
    this.saveToLocalStorage();
  }

  existsById(bookId: number): boolean {
    return this._items.findIndex((item) => item.id === bookId) >= 0;
  }

  private saveToLocalStorage(): void {
    localStorage.setItem(LocalStorageEnum.cartKey, JSON.stringify(this._items));
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem(LocalStorageEnum.cartKey)) return;

    this._items = JSON.parse(localStorage.getItem(LocalStorageEnum.cartKey)!);
  }
}
