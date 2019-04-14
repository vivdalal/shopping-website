import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {

  private readonly DELIVERY_CHARGES = 3.25;

  private amount: number;
  private count: number;
  private user: string;

  private cart: CartItem[] = [];
  private hasDeliveryCharges = false;
  private totalDeliveryCharges = 0;

  constructor(
    private router: Router,
    private cartService: CartService) {
  }

  ngOnInit() {
    const currentUser: string = window.sessionStorage.getItem('username');
    if (!currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    this.user = currentUser;
    this.fetchCartItems();
  }

  /**
   * Updates the current cart detail
   * @param cart The new cart items list
   */
  updateCartDetails(cart: CartItem[]) {
    this.cart = cart;
    this.count = cart.length;
    this.amount = cart.reduce((sum, item) => sum + (item.price || 0), 0);

    this.hasDeliveryCharges = this.amount <= 30;
    this.totalDeliveryCharges = this.amount <= 30 ? this.DELIVERY_CHARGES * cart.length : 0;
  }

  /**
   * Fetches the cart item for this user
   */
  fetchCartItems(): void {
    this.cartService.getCartItems(this.user).subscribe(this.updateCartDetails.bind(this));
  }

}
