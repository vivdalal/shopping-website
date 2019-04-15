import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../models/product';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-products-section',
  templateUrl: './products-section.component.html',
  styleUrls: ['./products-section.component.scss']
})
export class ProductsSectionComponent implements OnInit {

  @Input() private products: Product[];
  @Input() private name: string;
  @Input() private user: string;

  @Output() private cartUpdated = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }

}
