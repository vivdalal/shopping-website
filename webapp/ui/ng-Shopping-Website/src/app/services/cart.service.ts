import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CartItem } from '../models/cart-item';
import { OrderItem } from '../models/order-item';
import { AppConstants } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private http: HttpClient,
    private config: AppConstants) {
  }

  /**
   * Fetches the cart items for the given user
   * @param user The username whose cart items has to be fetched
   * @returns The observable that resolves to the cart items
   */
  getCartItems(user: string): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.config.API_ROOT}/cart?username=${user}`);
  }

  /**
   * Adds item to the cart
   * @param orderItem The item to be ordered
   * @returns The observable result for the add-to-cart action
   */
  addToCart(orderItem: OrderItem): Observable<object> {
    return this.http.post(`${this.config.API_ROOT}/cart`, orderItem);
  }

  /**
   * Places the order
   * @param user The user whose order that has to be placed
   */
  placeOrder(user: string): Observable<object> {
    return this.http.delete(`${this.config.API_ROOT}/cart/${user}`);
  }
}
