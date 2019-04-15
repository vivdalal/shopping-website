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
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  loading = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private alertService: AlertService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/products']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const user = this.authenticationService.login(this.f.username.value, this.f.password.value)
      .subscribe(
        response => {
          sessionStorage.setItem('username', this.f.username.value);
          this.router.navigate(['/products']);
        },
        error => {
          if (error.status === 400) {
            this.alertService.error('Invalid login credentials. Please enter both username and password');
            this.loading = false;
          } else if (error.status === 401) {
            this.alertService.error('Incorrect username/password');
            this.loading = false;
          } else {
            this.alertService.error('Something went wrong. Please try again.');
            this.loading = false;
          }

        });

    return;

  }

}
