import { Action } from '@ngrx/store';

export class GameAction implements Action {
  type: any;

  constructor(public payload: any) {
  }

}
