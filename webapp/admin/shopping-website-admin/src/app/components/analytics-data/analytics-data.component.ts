import { Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-analytics-data',
  templateUrl: './analytics-data.component.html',
  styleUrls: ['./analytics-data.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class AnalyticsDataComponent implements OnInit {

  @Input() private data: AnalyticsElement[];

  private readonly columnNames: string[];
  private expandedElement: AnalyticsElement | null;

  constructor() {
    this.columnNames = ['username', 'purchases'];
  }

  ngOnInit() {
  }
}
