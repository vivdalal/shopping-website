import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { ProductService } from '../../services/product.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-product-manager',
  templateUrl: './product-manager.component.html',
  styleUrls: ['./product-manager.component.scss']
})
export class ProductManagerComponent implements OnInit {

  private products: Product[];
  private categories: { [category: string]: Product[] };
  private selectedTabIndex: number;

  constructor(
    private snackBar: MatSnackBar,
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
    this.products = [];
    this.categories = {};
    this.selectedTabIndex = 0;
    this.fetchProducts();
  }

  /**
   * Fetches all the available products
   */
  fetchProducts(): void {
    this.productService.getProducts()
      .subscribe((products) => {
        if (!products || products.length === 0) {
          return;
        }
        this.products = products;
        this.categories = _.groupBy(products, (p) => p.category) || {};
      });
  }

  /**
   * Adds the product to the database
   * @param product The product to be added
   */
  addProduct(product: Product): void {
    this.productService.addProduct(product)
      .subscribe(() => {
          this.selectedTabIndex = 0;
          this.fetchProducts();
          this.snackBar.open('Added product!', null, {
            duration: 2000
          });
        },
        () => {
          this.snackBar.open('Unable to add the product!', null, {
            duration: 2000
          });
        });
  }
}
