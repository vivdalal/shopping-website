import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Product} from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private static readonly URL = 'http://localhost:5000';

  constructor(private http: HttpClient) {
  }

  /**
   * Fetches the products from the server
   * @return The collection of the products as an observable
   */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${ProductService.URL}/api/products`);
  }
}
