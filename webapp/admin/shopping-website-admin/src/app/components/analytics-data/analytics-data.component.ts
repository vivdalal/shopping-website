import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-analytics-data',
  templateUrl: './analytics-data.component.html',
  styleUrls: ['./analytics-data.component.scss']
})

export class AnalyticsDataComponent implements OnInit {

  @Input() private data: AnalyticsElement[];

  private readonly columnNames: string[];

  constructor() {
    this.columnNames = ['username', 'purchases'];
  }

  ngOnInit() {
    console.log(this.data);
  }
}
