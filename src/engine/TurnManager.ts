import { Enumerable } from './Enumerable';
import { Game } from './Game';

export interface TurnManagerConstructor<TCellType, TUnitType, TUnitOwner extends Enumerable> {
  new(game: Game<TCellType, TUnitType, TUnitOwner>): TurnManager<TCellType, TUnitType, TUnitOwner>;
}

export abstract class TurnManager<TCellType, TUnitType, TUnitOwner extends Enumerable> {

  constructor(
    public readonly game: Game<TCellType, TUnitType, TUnitOwner>,
  ) {}

  public abstract get initialOwner(): TUnitOwner;

  public abstract get activeOwner(): TUnitOwner;

  public nextTurn(): void {
    this.completeTurn();
    this.startNewTurn();
    this.game.doChanges();
  }

  public abstract completeTurn(): void;

  public abstract startNewTurn(): void;

  public abstract hasWinner(): boolean;

  public abstract getWinner(): TUnitOwner | null;

  public endGame(winner: TUnitOwner) {
    this.game.endGame(winner);
  }
}
