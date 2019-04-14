import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private static readonly URL = 'http://localhost:5000';

  constructor(private http: HttpClient) {
  }

  /**
   * Fetches the cart items for the given user
   * @param user The username whose cart items has to be fetched
   * @returns The observable that resolves to the cart items
   */
  getCartItems(user: string): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${CartService.URL}/api/cart?username=${user}`);
  }
}
