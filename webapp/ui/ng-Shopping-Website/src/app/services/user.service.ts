
import {User} from '../models/user';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConstants} from '../app.constants';


@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(
    private http: HttpClient,
    private config: AppConstants
  ) { }


  register(username: string, password: string) {
    const user = new User(username, password);
    return this.http.post(`${this.config.API_ROOT}/register`, user);
  }


}
