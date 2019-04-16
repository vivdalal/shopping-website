import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.services';
import {Router} from '@angular/router';
import {AlertService} from '../../services/alert.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string;
  password: string;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private alertService: AlertService){
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/products']);
    }
  }

  ngAfterViewInit() {
    (window as any).initialize();
  }

  login() {
    console.log(`email: ${this.email} password: ${this.password}`);
    // alert(`Email: ${this.email} Password: ${this.password}`);
    const user = this.authenticationService.login(this.email, this.password)
      .subscribe(
        response => {
          sessionStorage.setItem('username', this.email);
          this.router.navigate(['/products']);
        },
        error => {
          if (error.status === 400) {
            this.alertService.error('Invalid login credentials. Please enter both username and password');
          } else if (error.status === 401) {
            this.alertService.error('Incorrect username/password');
          } else {
            this.alertService.error('Something went wrong. Please try again.');
          }

        });

    return;

  }
}
