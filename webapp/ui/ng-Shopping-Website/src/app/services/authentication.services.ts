import {User} from '../models/user';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AppConstants} from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: string;
  public currentUser: string;

  constructor(private http: HttpClient,
              private config: AppConstants) {
    this.currentUserSubject = sessionStorage.getItem('username');
    this.currentUser = this.currentUserSubject;
  }


  public get currentUserValue(): string {
    return this.currentUserSubject;
  }

  login(username: string, password: string) {
    const user = new User(username, password);
    // make the api call
    return this.http.post(`${this.config.API_ROOT}/login`, user,  { observe: 'response' });

  }

  logout() {
    // remove user from session storage to log user out
    sessionStorage.removeItem('username');
  }
}



