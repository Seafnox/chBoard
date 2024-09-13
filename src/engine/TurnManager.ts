import { Enumerable } from './Enumerable';
import { Game } from './Game';

export interface TurnManagerConstructor<TCellType extends Enumerable, TUnitType extends Enumerable, TUnitOwner extends Enumerable> {
  new(game: Game<TCellType, TUnitType, TUnitOwner>): TurnManager<TCellType, TUnitType, TUnitOwner>;
}

export abstract class TurnManager<TCellType extends Enumerable, TUnitType extends Enumerable, TUnitOwner extends Enumerable> {

  constructor(
    public readonly game: Game<TCellType, TUnitType, TUnitOwner>,
  ) {}

  public abstract get initialOwner(): TUnitOwner;

  public abstract get activeOwner(): TUnitOwner;

  public abstract get winner(): TUnitOwner | null;

  public nextTurn(): void {
    this.completeTurn();
    this.startNewTurn();
  }

  public abstract completeTurn(): void;

  public abstract startNewTurn(): void;

  public abstract hasWinner(): boolean;

  public endGame(winner: TUnitOwner) {
    this.game.endGame(winner);
  }

  public abstract copy(turnManager: TurnManager<TCellType, TUnitType, TUnitOwner>): TurnManager<TCellType, TUnitType, TUnitOwner>;
}
