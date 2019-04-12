import {Component, OnInit} from '@angular/core';

import {Product} from '../../models/product';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  private products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.fetchProducts();
  }

  /**
   * Fetches all the products
   */
  private fetchProducts(): void {
    this.productService.getProducts()
      .subscribe(products => this.products = products);
  }
}
