import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Product} from '../models/product';
import { AppConstants } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
    private config: AppConstants
  ) {
  }

  /**
   * Fetches the products from the server
   * @return The collection of the products as an observable
   */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.config.API_ROOT}/products`);
  }

  /**
   * Fetches the recently bought products
   * @param user The user whose list has to be fetched
   * @param count The count of the products to be fetched
   * @return The collection of products
   */
  getRecentlyBoughtProducts(user: string, count: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.config.API_ROOT}/Cart/RecentProducts?username=${user}&count=${count}`);
  }
}
