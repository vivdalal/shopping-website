import { Guard, Hero, Player, Tile } from '../models';

export interface GameState {
  grid: Tile[][];
  hero: Hero;
  guard: Guard;
  score: number;
  time: Date;
  players: Array<Player>;
  state: string;
}
