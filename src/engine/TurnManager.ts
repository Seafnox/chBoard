import { ActionChangeType } from './actionChanges/ActionChangeType';
import { EndGameChange } from './actionChanges/EndGameChange';
import { Enumerable } from './Enumerable';
import { Game } from './Game';

export interface TurnManagerConstructor<TCellType extends Enumerable, TUnitType extends Enumerable, TUnitOwner extends Enumerable> {
  new(game: Game<TCellType, TUnitType, TUnitOwner>): TurnManager<TCellType, TUnitType, TUnitOwner>;
}

export interface TurnManagerConfig<TUnitOwner extends Enumerable> {
  initialOwner: TUnitOwner;
  nextTurnOwnerFn: (current?: TUnitOwner) => TUnitOwner;
  endGameConditionFn: () => boolean;
  winnerConditionFn: () => TUnitOwner[] | undefined;
}

export abstract class TurnManager<TCellType extends Enumerable, TUnitType extends Enumerable, TUnitOwner extends Enumerable> {
  protected _activeOwner: TUnitOwner;
  protected _config: TurnManagerConfig<TUnitOwner>;
  protected game: Game<TCellType, TUnitType, TUnitOwner>;

  constructor(
    game: Game<TCellType, TUnitType, TUnitOwner>,
    config: TurnManagerConfig<TUnitOwner>,
  ) {
    this.game = game;
    this._config = config;
    this._activeOwner = config.initialOwner;
  }

  get activeOwner(): TUnitOwner {
    return this._activeOwner;
  }

  get config(): TurnManagerConfig<TUnitOwner> {
    return this._config;
  }

  public completeTurn(): void {
    if (this._config.endGameConditionFn()) {
      const winners = this._config.winnerConditionFn();
      if (winners && winners.length > 0) {
        this.endGame(winners[0]);
      }
    }
  }

  public startNewTurn(): void {
    this._activeOwner = this._config.nextTurnOwnerFn();
  }

  copy(turnManager: TurnManager<TCellType, TUnitType, TUnitOwner>): TurnManager<TCellType, TUnitType, TUnitOwner> {
    const { activeOwner, config } = turnManager;

    this._activeOwner = activeOwner;
    this._config = config;

    return this;
  }

  public nextTurn(): void {
    this.completeTurn();
    this.startNewTurn();
  }

  public endGame(winner: TUnitOwner) {
    this.game.endGame(this.getEndGameAction(winner));
  }

  public getEndGameAction(winner: TUnitOwner): EndGameChange {
    return {
      type: ActionChangeType.EndGame,
      sourceId: this.game.board.id,
      winner: winner?.toString() || "Nobody",
    }
  }
}
