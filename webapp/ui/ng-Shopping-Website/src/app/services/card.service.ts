import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Card } from '../models/card';
import { AppConstants } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(
    private http: HttpClient,
    private config: AppConstants) { }

  /**
   * Fetches all the cards of the user
   * @param user The user whose cards has ro be fetched
   * @returns the observable that resolves to the available cards
   */
  getAllCards(user: string): Observable<Card[]> {
    return this.http.get<Card[]>(`${this.config.API_ROOT}/card/${user}`);
  }

  /**
   * Adds the card to the user account
   * @param card The card that has to be added
   * @returns The observable that resolves once the call is done
   */
  addCard(card: Card): Observable<object> {
    return this.http.post(`${this.config.API_ROOT}/card`, card);
  }
}
