import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item';
import { CardService } from '../../services/card.service';
import { Card } from '../../models/card';
import { Moment } from 'moment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  private readonly DELIVERY_CHARGES = 3.25;

  private user: string;
  private cart: CartItem[];
  private cards: Card[];
  private amount: number;
  private activeStep: number;
  private selectedCard: bigint;
  private shouldSaveCard: boolean;
  private showAddCardSection: boolean;

  private newCard: Card;
  private expiry: Moment;

  private readonly today: Moment = moment();

  constructor(
    private router: Router,
    private cartService: CartService,
    private cardService: CardService
  ) {
  }

  ngOnInit() {
    const currentUser: string = window.sessionStorage.getItem('username');
    if (!currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    this.user = currentUser;
    this.activeStep = 0;
    this.shouldSaveCard = false;
    this.showAddCardSection = false;
    this.newCard = {
      cardName: null,
      cardNo: null,
      cvv: null,
      expiry: null,
      username: this.user
    };
    this.fetchCartItems();
    this.fetchCards();
  }

  updateCartDetails(cart: CartItem[]) {
    this.cart = cart;
    this.amount = cart.reduce((sum, item) => sum + (item.price || 0), 0);
    this.amount = this.amount <= 30 ? this.DELIVERY_CHARGES * cart.length : this.amount;
  }

  /**
   * Fetches the cart item for this user
   */
  fetchCartItems(): void {
    this.cartService.getCartItems(this.user).subscribe(this.updateCartDetails.bind(this));
  }

  /**
   * Fetches all the card
   */
  fetchCards(): void {
    this.cardService.getAllCards(this.user).subscribe(cards => this.cards = cards);
  }

  /**
   * Advances to next step
   */
  goToNextStep(): void {
    this.activeStep += 1;
  }

  /**
   * When old card is selected/unselected
   */
  cardSelectionChanged(): void {
    if (this.selectedCard !== null) {
      this.showAddCardSection = false;
    }
  }

  /**
   * Show add card section
   */
  addNewCard(): void {
    this.showAddCardSection = true;
    this.selectedCard = null;
  }

  /**
   * Performs the checkout
   */
  async doCheckout(): Promise<void> {
    if (this.showAddCardSection && this.shouldSaveCard) {
      this.newCard.expiry = this.expiry.format('YYYY-MM');
      await this.cardService.addCard(this.newCard).toPromise();
    }

    this.cartService.placeOrder(this.user)
      .subscribe(() => this.router.navigateByUrl('products'));
  }

}
