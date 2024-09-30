import { TurnManager } from '../../../engine/TurnManager';
import { CheckersUnit } from '../ru/CheckersRuTypings';
import { CheckersCellType } from './CheckersCellType';
import { CheckersUnitOwner } from './CheckersUnitOwner';
import { CheckersUnitType } from './CheckersUnitType';

export class CheckersTurnManager extends TurnManager<CheckersCellType, CheckersUnitType, CheckersUnitOwner> {
  private _activeOwner: CheckersUnitOwner = this.initialOwner;

  get activeOwner(): CheckersUnitOwner {
    return this._activeOwner;
  }

  get initialOwner(): CheckersUnitOwner {
    return CheckersUnitOwner.White;
  }

  completeTurn(): void {
    if (this.getActiveBlackUnits().length === 0) {
      const winner = CheckersUnitOwner.White;
      this.endGame(winner);
      return;
    }

    if (this.getActiveWhiteUnits().length === 0) {
      const winner = CheckersUnitOwner.Black;
      this.endGame(winner);
      return;
    }
  }

  startNewTurn() {
    this._activeOwner = this._activeOwner === CheckersUnitOwner.White ? CheckersUnitOwner.Black : CheckersUnitOwner.White;
  }

  copy(turnManager: TurnManager<CheckersCellType, CheckersUnitType, CheckersUnitOwner>): TurnManager<CheckersCellType, CheckersUnitType, CheckersUnitOwner> {
    const { activeOwner } = turnManager;

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
