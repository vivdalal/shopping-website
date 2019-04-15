import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GameState } from './store/game.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-runman',
  templateUrl: './runman.component.html'
})
export class RunmanComponent implements OnInit {

  private gameState: Observable<GameState>;

  constructor(private store: Store<GameState>) {
  }

  ngOnInit() {
    this.gameState = this.store.select<GameState>('gameState');
  }

}
