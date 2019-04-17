import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonToggleGroup } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private readonly MENU_OPTIONS = {
    PRODUCTS: 'products',
    ANALYTICS: 'analytics'
  };
  private selectedOption: string = this.MENU_OPTIONS.PRODUCTS;

  @ViewChild(MatButtonToggleGroup) menuOptions: MatButtonToggleGroup;

  constructor() {
  }

  ngOnInit() {
  }
}
