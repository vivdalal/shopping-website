import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../app.constants';
import { Observable } from 'rxjs';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private config: AppConstants,
    private http: HttpClient
  ) { }

  /**
   * Fetches the orders for the given user
   * @param user The username whose orders has to be fetched
   * @returns The observable that resolves to the orders
   */
  getOrders(user: string): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.config.API_ROOT}/orders?username=${user}`);
  }
}
