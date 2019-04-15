import { Guard, Hero, Player, Tile } from '../models';

export interface IGame {

  grid: Tile[][];
  height: number;
  width: number;
  tileSize: number;
  hero: Hero;
  guard: Guard;
  goal: Tile;
  players: Array<Player>;
  /** Game score */
  score: number;
  time: number;

  newGame(x: number, y: number);

  pauseGame();

  resumeGame();

  moveHero(target: Tile);

  addBot();
}
