import { Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

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

  private isActive = false;

  constructor() {
  }

  onHover() {
    this.isActive = true;
  }

  offHover() {
    this.isActive = false;
  }

  ngOnInit() {
  }

}
