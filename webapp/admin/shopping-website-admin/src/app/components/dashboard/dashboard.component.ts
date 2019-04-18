import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonToggleGroup } from '@angular/material';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

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

  constructor(
    private auth: AuthenticationService,
    private router: Router
  ) {
  }

  ngOnInit() {
    const currentUser: string = this.auth.currentUser;
    if (!currentUser) {
      this.router.navigate(['/login']);
      return;
    }
  }

  /**
   * logs the user out
   */
  doLogout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
