import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from '../../models/card';

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.scss']
})
export class CardItemComponent implements OnInit {

  @Input() private card: Card;
  @Input() private selected: boolean;

  constructor() { }

  ngOnInit() {
  }
}
