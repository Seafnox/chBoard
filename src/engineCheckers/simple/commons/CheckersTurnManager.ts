import { TurnManager } from '../../../engine/TurnManager';
import { CheckersCellType } from './CheckersCellType';
import { CheckersUnitOwner } from './CheckersUnitOwner';
import { CheckersUnitType } from './CheckersUnitType';

export class CheckersTurnManager extends TurnManager<CheckersCellType, CheckersUnitType, CheckersUnitOwner> {
  private _activeOwner: CheckersUnitOwner = this.initialOwner;
  private _winner: CheckersUnitOwner | null = null;

  public getWinner(): CheckersUnitOwner | null {
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

  nextTurn(): void {
    if (this.game.board.units.filter(unit => unit.owner === CheckersUnitOwner.Black).length === 0) {
      this._winner = CheckersUnitOwner.White;
      this.endGame(this._winner);
      return;
    }

    if (this.game.board.units.filter(unit => unit.owner === CheckersUnitOwner.White).length === 0) {
      this._winner = CheckersUnitOwner.Black;
      this.endGame(this._winner);
      return;
    }

    this._activeOwner = this._activeOwner === CheckersUnitOwner.White ? CheckersUnitOwner.Black : CheckersUnitOwner.White;
  }
}
