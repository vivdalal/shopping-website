import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {

  @Input() private name: string;
  @Input() private img: string;
  @Input() private price: number;
  @Input() private description: string;
  @Input() private isInStock: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }
}
