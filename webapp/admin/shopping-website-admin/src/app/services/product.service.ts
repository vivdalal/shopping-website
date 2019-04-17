import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
   * Adds a product to the web site
   * @param product The product to be added
   */
  addProduct(product: Product): Observable<object> {
    return this.http.post<object>(`${this.config.API_ROOT}/products`, product);
  }
}
