import { interval as observableInterval, never as observableNever, of as observableOf, timer as observableTimer } from 'rxjs';

import { delay, exhaustMap, map, switchMap, take, takeUntil, takeWhile, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs-compat';
import { Store } from '@ngrx/store';

import { GameState } from '../store/game.state';
import { AudioService } from '../audio/audio.service';
import { GridHelper, PlayerHelper } from '../helpers';
import { IGame } from './game.interface';
import { PathFinder } from '../algorithm/pathfinder';
import { Guard, Hero, Player, Tile } from '../models';
import { GameMode, GameSettings, GameStore, PlayerActions, PlayerSprites, PlayerStates } from '../store/game.const';
import { Router } from '@angular/router';

@Injectable()
export class GameService implements IGame {

  /** Grid Tiles */
  grid: Tile[][];
  height: number;
  width: number;
  tileSize: number;

  /** Main characters */
  hero: Hero;
  guard: Guard;
  goal: Tile;
  /** Game players list */
  players: Array<Player>;
  /** Game score */
  score: number;
  /** Game Timer */
  time: number;

  /** To pause the runman */
  pauser$: BehaviorSubject<boolean>;
  /** To stream only recent routes to players */
  players$: Array<Subject<any>>;
  /** To get routes from pathfinder */
  routing$: Subject<any>;
  /** To unsubscribe from all streams when runman is over. */
  gameOver$: Subject<any>;
  /** For attacking actions */
  attacking$: Subject<any>;

  constructor(
    private store: Store<GameState>,
    private http: HttpClient,
    public audio: AudioService,
    private router: Router) {
    /** Pauser should be initialized in the constructor  */
  }

  newGame(x: number, y: number) {
    /** Initialize Pauser/close modal if open */
    this.pauser$ = new BehaviorSubject(false);
    /** Unsubscribe from all streams */
    if (this.gameOver$) {
      this.gameOver$.next(true);
    }
    this.audio.music.play();
    /** Prepare the grid, initialize all variables */
    this.grid = [];
    this.width = x;
    this.height = y;
    this.tileSize = GameSettings.TILE_SIZE;
    this.time = GameSettings.TIME;
    this.score = 0;
    this.players = new Array<Player>();
    this.players$ = new Array<Subject<any>>();
    this.routing$ = new Subject();
    this.attacking$ = new Subject();
    this.gameOver$ = new Subject();
    /** Draw the grid */
    for (let i = 0; i < x; i++) {
      this.grid[i] = [];
      for (let j = 0; j < y; j++) {
        this.grid[i].push(new Tile({ x: i, y: j }, true));
      }
    }
    /** Load the map */
    this.loadMap().subscribe();
  }

  pauseGame() {
    this.audio.pause.play();
    this.gameState(GameMode.PAUSED);
  }

  resumeGame() {
    this.audio.music.play();
    this.gameState(GameMode.PLAYING);
  }

  moveHero(index) {
    const target = this.grid[index.x][index.y];
    if (target.walkable) {
      this.routing$.next({ player: this.hero, target });
    }
  }

  addBot() {
    const target = GridHelper.getRandomTarget(this, this.hero, 2);
    const player = new Player(target.index, PlayerSprites.BOY, 'hero');
    PlayerHelper.addPlayer(this, player);
  }

  /** Stream player's steps to target */
  moveStream(player: Player) {
    /** Stream recent route */
    return this.players$[player.routingIndex]
      .pipe(switchMap((target) => {
        return observableTimer(0, player.speed).pipe(
          take(player.route.length),
          map(() => player.route.pop()),
          tap((nextTile) => {
              if (player === this.hero) {
                this.score += 50;
                if (GridHelper.compareIndex(nextTile, this.goal)) {
                  this.gameState(GameMode.WON);
                }
              }
              /** If target became un-walkable get a new route */
              if (!nextTile.walkable) {
                this.routing$.next({ player, target: nextTile });
              } else {
                this.moveStep(player, nextTile);
              }
            },
            (err) => {
              console.warn(err);
            },
            () => {
              observableOf(null).pipe(
                delay(player.speed),
                tap(() => {
                  /** If guard is attacking target */
                  if (target && player === this.guard && !player.route.length) {
                    const route = GridHelper.scan(this, this.guard, this.players, 1);
                    if (route.length) {
                      this.attacking$.next({ attacker: player, victim: route[0].target });
                    }
                  } else {
                    player.state = PlayerStates.IDLE;
                  }

                  this.updateStore();
                }), ).subscribe();
            }), );
      }));
  }

  /** Move a player randomly in specific range */
  pilotStream(player: Player) {
    return observableTimer(0, GridHelper.getRandomBetween(1200, 2500)).pipe(
      tap(() => {
        if (player.action === PlayerActions.ATTACKING) {
          return;
        }
        const target = GridHelper.getRandomTarget(this, player, 3);
        if (this.players$[player.routingIndex]) {
          this.routing$.next({ player, target });
        }
      }),
      takeWhile(() => this.players.includes(player)), );
  }

  gameState(mode) {
    this.store.dispatch({
      type: GameStore.GAME_STATE,
      payload: mode
    });

    const pause = () => {
      this.pauser$.next(true);
      this.audio.music.pause();
    };

    const gameOver = (hasWon: boolean = false) => {
      this.gameOver$.next();
      if (hasWon) {
        this.audio.win.play();
      } else {
        this.audio.gameOver.play();
      }
      setTimeout(() => this.router.navigate(['products'],
        {
          queryParams: { win: hasWon && this.score >= 1000, order: 'success' }
        }), 3000);
    };

    switch (mode) {
      case GameMode.PAUSED:
        pause();
        break;
      case GameMode.ABOUT:
        pause();
        break;
      case GameMode.WON:
        pause();
        gameOver();
        break;
      case GameMode.LOST:
        pause();
        gameOver();
        break;
      case GameMode.TIME_UP:
        pause();
        gameOver();
        break;
      default:
        this.pauser$.next(false);
        break;
    }

    // /** Pause the runman on about modal */
    // if (mode === GameMode.ABOUT) {
    //   this.pauser$.next(true);
    //   return;
    // }
    //
    //
    // let isPlaying = (mode === GameMode.PLAYING);
    // this.pauser$.next(!isPlaying);
    //
    // if (isPlaying) return;
    // if (mode !== GameMode.PAUSED) {
    //   this.gameOver$.next();
    //   (mode === GameMode.TIME_UP || mode === GameMode.LOST) ? this.audio.gameOver.play() : this.audio.win.play();
    // }
    // this.audio.music.pause();
  }

  private loadMap() {
    return this.http.get<Array<object>>(GridHelper.prefixUrl('/assets/map/map.json')).pipe(
      tap((res) => {
          res.map((t: Tile) => {
            if (t.index.x < this.width && t.index.y < this.height) {
              const tile = new Tile(t.index, t.walkable, t.sprite);
              tile.type += ' ' + t.type;
              this.grid[t.index.x][t.index.y] = tile;
            }
          });
          /** Set goal */
          this.goal = this.grid[0][0];
          this.goal.type += ' flag';
          this.goal.sprite = GridHelper.prefixUrl(PlayerSprites.FLAG);

          /** Add hero */
          this.hero = new Hero({ x: 1, y: 9 });
          PlayerHelper.addPlayer(this, this.hero);

          /** Add guard */
          this.guard = new Guard({ x: 0, y: 0 });
          PlayerHelper.addPlayer(this, this.guard);

          /** Start timer */
          this.pauser$.pipe(switchMap(paused => paused ? observableNever() : this.timerStream(this.time)),
            takeUntil(this.gameOver$), ).subscribe();

          /** Start routing */
          this.pauser$.pipe(switchMap(paused => paused ? observableNever() : this.routingStream()),
            takeUntil(this.gameOver$), ).subscribe();

          /** Attacking stream (for the guard) */
          this.pauser$.pipe(switchMap(paused => paused ? observableNever() : this.attackingStream()),
            takeUntil(this.gameOver$), ).subscribe();

          /** Scanner (for the guard) */
          this.pauser$.pipe(switchMap(paused => paused ? observableNever() : this.scanStream(this.guard)),
            takeUntil(this.gameOver$), ).subscribe();
        },
        (err) => console.warn('LOAD MAP: ', err),
        () => {
          this.gameState(GameMode.PLAYING);
          this.updateStore();
        }
      ));
  }

  /** Move player one step */
  private moveStep(player: Player, target: Tile) {
    /** Set the player current tile to walkable and next tile to un-walkable */
    PlayerHelper.setPlayerDirection(player, target);
    this.grid[player.index.x][player.index.y].walkable = true;
    target.walkable = false;
    player.index = target.index;
    player.state = PlayerStates.WALKING;
    this.updateStore();
  }

  /** Move player to target using PathFinder */
  private routingStream() {
    return this.routing$.pipe(tap((res) => {
        /** Set player's tile to walkable for the PathFinder */
        const start = this.grid[res.player.index.x][res.player.index.y];
        start.walkable = true;

        const nextRoute = PathFinder.searchPath(this, start, res.target);
        /** if there is no route set player's tile to un-walkable */
        if (nextRoute && nextRoute.length) {
          res.player.route = nextRoute;
          this.players$[res.player.routingIndex].next();
        } else {
          start.walkable = false;
        }
      },
      (err) => {
        console.warn(err);
      }
    ));
  }

  /** Scan for players in range (GUARD ONLY) */
  private scanStream(player: Player) {
    return observableTimer(0, GameSettings.SCAN_INTERVAL).pipe(
      tap(() => {

        const routes = GridHelper.scan(this, player, this.players, 5);
        if (routes.length) {
          player.action = PlayerActions.ATTACKING;
          /** Get the closest target */
          const res = routes.reduce((prev, next) => prev.route.length > next.route.length ? next : prev);
          if (res.route) {
            /** Remove the target tile from next route */
            res.route.shift();
            player.route = res.route;
            this.players$[player.routingIndex].next(res.target);
          }
        } else {
          player.action = PlayerActions.GUARDING;
        }
      }));
  }

  /** Game timer */
  private timerStream(duration: number) {
    return observableInterval(1000).pipe(tap((elapsed) => {
      /** Time left in seconds */
      this.time = duration - elapsed;
      if (this.time > 0) {
        const t = new Date(1970, 0, 1);
        t.setSeconds(this.time);
        this.store.dispatch({
          payload: t,
          type: GameStore.TIMER_TICK
        });
      } else {
        this.gameState(GameMode.TIME_UP);
      }
    }));
  }

  /** player attack another player */
  private attackingStream() {
    return this.attacking$.pipe(exhaustMap(res => {
      /** Change attacker direction towards the victim */
      const attacker = res.attacker;
      const victim = res.victim;
      PlayerHelper.attackEffect(this, attacker, victim);

      return observableOf(null).pipe(
        delay(attacker.speed),
        tap(() => {
          attacker.styles = Object.assign({}, attacker.styles, { transform: 'translate(0, 0)' });
          attacker.state = PlayerStates.IDLE;
          /** Add blood effect & remove after 1 second */
          victim.blood = true;

          /** remove one life from victim & remove him if he has no more lives */
          if (victim.lives.length) {
            victim.lives.pop();
            if (!victim.lives.length) {
              PlayerHelper.removePlayer(this, victim);
            }
          }
          this.updateStore();
        }), );
    }));
  }

  private updateStore() {
    this.store.dispatch({
      payload: {
        grid: this.grid,
        hero: this.hero,
        guard: this.guard,
        players: this.players,
        score: this.score
      },
      type: GameStore.UPDATE_STORE
    });
  }
}
