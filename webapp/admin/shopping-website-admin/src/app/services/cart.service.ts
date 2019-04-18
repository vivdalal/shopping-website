import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private config: AppConstants,
    private http: HttpClient
  ) { }

  /**
   * Fetches all the cart items that are ordered
   * @returns The list of cart items that was ordered
   */
  getAllOrders(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.config.API_ROOT}/cart/all`);
  }
}
