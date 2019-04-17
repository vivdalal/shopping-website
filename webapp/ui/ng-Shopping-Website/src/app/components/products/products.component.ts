import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { AuthenticationService } from '../../services/authentication.services';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  private products: Product[] = [];
  private cartItemsCount: number;
  private user: string;

  private hasWon: boolean;
  private orderState: string;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthenticationService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    const currentUser: string = this.auth.currentUser;
    if (!currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    this.route.queryParamMap
      .subscribe((params) => {
        this.hasWon = params.get('win') && params.get('win') === 'true';

        if (params.get('order') === 'success') {
          this.snackBar.open('Order successfully placed!', null, { duration: 2000 });
        }
      });

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
