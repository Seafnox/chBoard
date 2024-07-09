import { EventEmitter } from './EventEmitter';
import { Game } from './Game';

export interface TurnManagerConstructor<TCellType, TUnitType, TUnitOwner, TTurnManager extends TurnManager<TCellType, TUnitType, TUnitOwner>> {
  new(game: Game<TCellType, TUnitType, TUnitOwner>, eventBus: EventEmitter): TTurnManager;
}

export abstract class TurnManager<TCellType, TUnitType, TUnitOwner> {

  constructor(
    public readonly game: Game<TCellType, TUnitType, TUnitOwner>,
    public readonly eventBus: EventEmitter,
  ) {}

  public abstract get initialOwner(): TUnitOwner;

  public abstract get activeOwner(): TUnitOwner;

  public abstract nextTurn(): void;

  public abstract hasWinner(): boolean;

  public abstract getWinner(): TUnitOwner | null;

  public endGame(winner: TUnitOwner) {
    this.game.endGame(winner);
  }
}
