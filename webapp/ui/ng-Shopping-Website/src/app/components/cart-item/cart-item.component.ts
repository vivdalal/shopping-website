import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  @Input() private cartItem: CartItem;
  @Input() private hasDeliveryCharges: boolean;
  @Input() private deliveryCharges: number;

  constructor() { }

  ngOnInit() {
  }

}
