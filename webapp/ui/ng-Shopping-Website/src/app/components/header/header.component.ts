import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationService} from '../../services/authentication.services';

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

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {

  }

  ngOnInit(): void {
  }

  /**
   * Logs out the current user
   */
  doLogout(): void {
    console.log('do logout called');
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
