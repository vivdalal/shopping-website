import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../services/authentication.services';
import {Router} from '@angular/router';
import {AlertService} from '../../services/alert.service';
import {first} from 'rxjs/internal/operators/first';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements AfterViewInit {
  email: string;
  password: string;

  constructor(private authenticationService: AuthenticationService,
              private router: Router,
              private alertService: AlertService,
              private userService: UserService) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/products']);
    }
  }

  ngAfterViewInit() {
    (window as any).initialize();
  }


  register() {
    const user = this.userService.register(this.email, this.password)
      .subscribe(
        data => {
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
        },
        error => {
          if (error.status === 409) {
            this.alertService.error('Username already exists!!');
          } else if (error.status === 400) {
            this.alertService.error('Username/Password not entered correctly');
          } else {
            this.alertService.error('Something went wrong! Please try after sometime.');
          }
        });
  }

}
