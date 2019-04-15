import {User} from '../models/user';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {CartItem} from '../models/cart-item';
import {AppConstants} from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient,
              private config: AppConstants) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('username')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    const user = new User(username, password);
    // make the api call
    return this.http.post(`${this.config.API_ROOT}/login`, user,  { observe: 'response' });

    // check whether the api returns 200. If yes, login the user, else show error
    // console.log('username: ' + username + ' and password: ' + password);


    // return user;
  }

  logout() {
    // remove user from session storage to log user out
    sessionStorage.removeItem('username');
    this.currentUserSubject.next(null);
  }
}



