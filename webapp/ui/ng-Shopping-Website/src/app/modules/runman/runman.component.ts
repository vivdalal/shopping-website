import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GameState } from './store/game.state';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-runman',
  templateUrl: './runman.component.html'
})
export class RunmanComponent implements OnInit {

  private gameState: Observable<GameState>;
  private readonly GAME_TIME = 20000;

  constructor(
    private store: Store<GameState>,
    private router: Router) {
  }

  ngOnInit() {
    this.gameState = this.store.select<GameState>('gameState');
    setTimeout(this.wrapUpTheGame.bind(this), this.GAME_TIME);
  }

  wrapUpTheGame() {
    this.router.navigateByUrl('products');
  }

}
