import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  private products: Product[] = [];
  private cartItemsCount: number;
  private user: string;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {
  }

  ngOnInit() {
    const currentUser: string = window.sessionStorage.getItem('username');
    if (!currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    this.user = currentUser;
    this.fetchProducts();
    this.updateCartCount();
  }

  /**
   * Fetches the cart count from the server and updates it
   */
  private updateCartCount(): void {
    this.cartService.getCartItems(this.user)
      .subscribe(cart => this.cartItemsCount = cart.length);
  }

  /**
   * Fetches all the products
   */
  private fetchProducts(): void {
    this.productService.getProducts()
      .subscribe(products => this.products = products);
  }
}
