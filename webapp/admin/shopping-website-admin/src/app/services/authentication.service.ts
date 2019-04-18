import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstants } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public currentUser: string;

  constructor(private http: HttpClient,
              private config: AppConstants) {
    this.currentUser = localStorage.getItem('username');
  }

  public get currentUserValue(): string {
    return this.currentUser;
  }

  login(username: string, password: string): Observable<object> {
    const user: User = { username, password };
    // make the api call
    return this.http.post(`${this.config.API_ROOT}/login/admin`, user,  { observe: 'response' });
  }

  logout() {
    // remove user from session storage to log user out
    localStorage.removeItem('username');
    this.currentUser = null;
  }
}



