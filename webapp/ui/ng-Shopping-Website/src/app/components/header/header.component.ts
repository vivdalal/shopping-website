import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() private name: string;
  @Input() private title: string;
  @Input() private count: number;
  @Input() private showCartIcon: boolean;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  /**
   * Logs out the current user
   */
  doLogout(): void {
    window.sessionStorage.removeItem('username');
    this.router.navigateByUrl('login');
  }
}
