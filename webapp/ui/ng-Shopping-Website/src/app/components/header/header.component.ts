import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() private name: string;
  @Input() private title: string;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Logs out the current user
   */
  doLogout(): void {

  }

  /**
   * Routes the user to the cart page
   */
  showCart(): void {

  }
}
