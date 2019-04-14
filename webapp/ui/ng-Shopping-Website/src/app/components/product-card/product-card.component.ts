import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CartService } from '../../services/cart.service';
import { OrderItem } from '../../models/order-item';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  animations: [
    trigger('hoverStateChange', [
      state('hoverOn', style({
        boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.3)',
        transform: 'scale(1.1)'
      })),
      state('hoverOff', style({
        boxShadow: '1px 1px 2px rgba(0, 0, 0, 0.15)',
        transform: 'none'
      })),
      transition('hoverOff => hoverOn', [
        animate('0.3s')
      ]),
      transition('hoverOn => hoverOff', [
        animate('0.1s')
      ])
    ])
  ]
})
export class ProductCardComponent implements OnInit {

  @Input() private name: string;
  @Input() private img: string;
  @Input() private price: number;
  @Input() private id: number;
  @Input() private user: string;

  @Output() private cartUpdated = new EventEmitter<string>();

  private isActive = false;
  private quantity: number;

  constructor(private cartService: CartService) {
  }

  onHover() {
    this.isActive = true;
  }

  offHover() {
    this.isActive = false;
  }

  ngOnInit() {
    this.quantity = 1;
  }

  /**
   * Adds the product to the cart
   */
  addToCart(): void {
    const orderItem: OrderItem = {
      username: this.user,
      productId: this.id,
      quantity: this.quantity
    };

    this.cartService.addToCart(orderItem)
      .subscribe(() => this.cartUpdated.emit());
  }
}
