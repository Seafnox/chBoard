import { ActionChangeType } from './actionChanges/ActionChangeType';
import { EndGameChange } from './actionChanges/EndGameChange';
import { Enumerable } from './Enumerable';
import { Game } from './Game';
import { InteractiveEntity } from './InteractiveEntity';

export interface TurnManagerConstructor<TCellType extends Enumerable, TUnitType extends Enumerable, TUnitOwner extends Enumerable> {
  new(game: Game<TCellType, TUnitType, TUnitOwner>): TurnManager<TCellType, TUnitType, TUnitOwner>;
}

export abstract class TurnManager<TCellType extends Enumerable, TUnitType extends Enumerable, TUnitOwner extends Enumerable> {

  constructor(
    public readonly game: Game<TCellType, TUnitType, TUnitOwner>,
  ) {}

  public abstract get initialOwner(): TUnitOwner;

  public abstract get activeOwner(): TUnitOwner;

  public abstract completeTurn(): void;

  public abstract startNewTurn(): void;

  public abstract copy(turnManager: TurnManager<TCellType, TUnitType, TUnitOwner>): TurnManager<TCellType, TUnitType, TUnitOwner>;

  public nextTurn(): void {
    this.completeTurn();
    this.startNewTurn();
  }

  public endGame(winner: TUnitOwner) {
    this.game.endGame(this.getEndGameAction(winner));
  }

  public getEndGameAction(winner: TUnitOwner): EndGameChange<TCellType, TUnitType, TUnitOwner, InteractiveEntity<TCellType, TUnitType, TUnitOwner>> {
    return {
      type: ActionChangeType.EndGame,
      source: this.game.board,
      winner,
    }
  }
}
