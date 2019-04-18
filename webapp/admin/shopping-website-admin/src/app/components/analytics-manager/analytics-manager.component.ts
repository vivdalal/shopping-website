import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-analytics-manager',
  templateUrl: './analytics-manager.component.html',
  styleUrls: ['./analytics-manager.component.scss']
})
export class AnalyticsManagerComponent implements OnInit {

  private data: AnalyticsElement[];

  constructor(
    private cartService: CartService
  ) {
  }

  ngOnInit() {
    this.data = [];
    this.fetchCartItems();
  }

  processData(data: CartItem[]) {
    const cartItemsGroupedByUser: Dictionary<CartItem[]> = _.groupBy<CartItem>(data, item => item.user);
    const newData: AnalyticsElement[] = [];

    for (const user of Object.keys(cartItemsGroupedByUser)) {
      newData.push({
        username: user,
        purchases: _.reduce(cartItemsGroupedByUser[user],
          (acc: number, item: CartItem) => acc + item.quantity,
          0),
        totalMoney: _.reduce(cartItemsGroupedByUser[user],
          (acc: number, item: CartItem) => acc + item.price,
          0),
        products: _.reduce(cartItemsGroupedByUser[user],
          (acc: Product[], item: CartItem) => {
            if (_.some<Product>(acc, { id: item.product.id })) {
              return acc;
            }
            acc.push(item.product);
            return acc;
          },
          [])
      });
    }

    this.data = Object.assign([], newData);
  }

  fetchCartItems() {
    this.cartService.getAllOrders()
      .subscribe((cartItems = []) => this.processData(cartItems));
  }
}
