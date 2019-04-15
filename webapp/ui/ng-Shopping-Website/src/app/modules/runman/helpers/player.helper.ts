import { never as observableNever, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { Player } from '../models/player/player.model';
import { GameService } from '../service/game.service';
import { Tile } from '../models';
import { GameMode, GameSettings, PlayerDirections } from '../store/game.const';

export namespace PlayerHelper {

  export const addPlayer = (game: GameService, player: Player) => {

    game.grid[player.index.x][player.index.y].walkable = false;
    game.players.push(player);
    player.routingIndex = game.players$.push(new Subject<Tile[]>()) - 1;

    game.pauser$.pipe(switchMap(paused => paused ? observableNever() : game.moveStream(player)),
      takeUntil(game.gameOver$), ).subscribe();

    if (player.bot) {
      game.pauser$.pipe(switchMap(paused => paused ? observableNever() : game.pilotStream(player)),
        takeUntil(game.gameOver$), ).subscribe();
    }
  };

  export const removePlayer = (game: GameService, player: Player) => {
    /** Remove & Unsubscribe automatically */

    game.audio.remove.play();
    if (game.players$.includes(game.players$[player.routingIndex])) {
      game.players$.splice(game.players$.indexOf(game.players$[player.routingIndex]), 1);
    }
    game.grid[player.index.x][player.index.y].walkable = true;

    if (game.players.includes(player)) {
      game.players.splice(game.players.indexOf(player), 1);
    }

    if (player === game.hero) {
      game.gameState(GameMode.LOST);
    }
  };

  /** Get player direction towards the target */
  export const setPlayerDirection = (player: Player, target: Tile) => {
    player.direction = (target.index.x === player.index.x) ?
      (target.index.y > player.index.y) ? PlayerDirections.BOTTOM : PlayerDirections.TOP
      : (target.index.x > player.index.x) ? PlayerDirections.RIGHT : PlayerDirections.LEFT;
  };

  /** Player Attack Effect */
  export const attackEffect = (game: GameService, attacker: Player, victim: Player) => {

    victim.blood = false;
    setPlayerDirection(attacker, victim);
    let transform;
    switch (attacker.direction) {
      case PlayerDirections.TOP:
        transform = `translate(0, -${GameSettings.TILE_SIZE / 2}px)`;
        break;
      case PlayerDirections.BOTTOM:
        transform = `translate(0, ${GameSettings.TILE_SIZE / 2}px)`;
        break;
      case PlayerDirections.LEFT:
        transform = `translate(-${GameSettings.TILE_SIZE / 2}px, 0)`;
        break;
      case PlayerDirections.RIGHT:
        transform = `translate(${GameSettings.TILE_SIZE / 2}px, 0)`;
        break;
      default:
        transform = 'translate(0, 0)';
    }
    attacker.styles = Object.assign({}, attacker.styles, { transform });
    game.audio.attack.play();
  };

}
