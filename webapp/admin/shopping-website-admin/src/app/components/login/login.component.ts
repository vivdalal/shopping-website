import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';

import '../../../assets/js/login-animation';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {
  email: string;
  password: string;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private snackBar: MatSnackBar) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/home']);
    }
  }

  ngAfterViewInit() {
    (window as any).initialize();
  }

  login() {
    this.authenticationService.login(this.email, this.password)
      .subscribe(
        () => {
          this.authenticationService.currentUser = this.email;
          localStorage.setItem('username', this.email);
          this.router.navigate(['/home']);
        },
        error => {
          if (error.status === 400) {
            this.snackBar.open(
              'Invalid login credentials. Please enter both username and password',
              null,
              { duration: 2000 });
          } else if (error.status === 401) {
            this.snackBar.open(
              'Incorrect username/password',
              null,
              { duration: 2000 });
          } else {
            this.snackBar.open(
              'Something went wrong. Please try again.',
              null,
              { duration: 2000 });
          }
        });
  }
}
