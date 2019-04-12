import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() private name: string;
  @Input() private title: string;
  @Input() private count: number;

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Logs out the current user
   */
  doLogout(): void {

  }
}
