import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.services';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit {

  private user: string;
  private cartItemsCount: number;
  private orders: CartItem[] = [];

  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private cartService: CartService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    const currentUser: string = this.auth.currentUser;
    if (!currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    this.user = currentUser;
    this.updateCartCount();
    this.fetchOrders();
  }

  private fetchOrders(): void {
    this.orderService.getOrders(this.user)
      .subscribe(orders => this.orders = orders);
  }

  /**
   * Fetches the cart count from the server and updates it
   */
  private updateCartCount(): void {
    this.cartService.getCartItems(this.user)
      .subscribe(cart => this.cartItemsCount = cart.length);
  }
}
