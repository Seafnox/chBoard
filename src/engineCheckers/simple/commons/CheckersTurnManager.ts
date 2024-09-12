import { TurnManager } from '../../../engine/TurnManager';
import { CheckersUnit } from '../ru/CheckersRuTypings';
import { CheckersCellType } from './CheckersCellType';
import { CheckersUnitOwner } from './CheckersUnitOwner';
import { CheckersUnitType } from './CheckersUnitType';

export class CheckersTurnManager extends TurnManager<CheckersCellType, CheckersUnitType, CheckersUnitOwner> {
  private _activeOwner: CheckersUnitOwner = this.initialOwner;
  private _winner: CheckersUnitOwner | null = null;

  get winner(): CheckersUnitOwner | null {
    return this._winner;
  }

  get activeOwner(): CheckersUnitOwner {
    return this._activeOwner;
  }

  hasWinner(): boolean {
    return !!this._winner;
  }

  get initialOwner(): CheckersUnitOwner {
    return CheckersUnitOwner.White;
  }

  completeTurn(): void {
    if (this.getActiveBlackUnits().length === 0) {
      this._winner = CheckersUnitOwner.White;
      this.endGame(this._winner);
      return;
    }

    if (this.getActiveWhiteUnits().length === 0) {
      this._winner = CheckersUnitOwner.Black;
      this.endGame(this._winner);
      return;
    }
  }

  startNewTurn() {
    this._activeOwner = this._activeOwner === CheckersUnitOwner.White ? CheckersUnitOwner.Black : CheckersUnitOwner.White;
  }

  copy(turnManager: TurnManager<CheckersCellType, CheckersUnitType, CheckersUnitOwner>): TurnManager<CheckersCellType, CheckersUnitType, CheckersUnitOwner> {
    const { winner, activeOwner } = turnManager;

    this._winner = winner;
    this._activeOwner = activeOwner;

    return this;
  }

  getActiveBlackUnits(): CheckersUnit[] {
    return this.game.board.units
      .filter(unit => unit.owner === CheckersUnitOwner.Black)
      .filter(unit => !unit.isDead);
  }

  getActiveWhiteUnits(): CheckersUnit[] {
    return this.game.board.units
      .filter(unit => unit.owner === CheckersUnitOwner.White)
      .filter(unit => !unit.isDead);
  }
}
