import { Action } from '../../../engine/Action';
import { isChangingActionChange } from '../../../engine/actionChanges/isChangingActionChange';
import { isMovingActonChange } from '../../../engine/actionChanges/isMovingActonChange';
import { isRemovingActionChange } from '../../../engine/actionChanges/isRemovingActionChange';
import { TwoPlayerUnitOwner } from '../../../engine/twoPlayer/TwoPlayerUnitOwner';
import { CheckersUnit, CheckersActionChange } from '../ru/CheckersRuTypings';
import { CheckersCellType } from './CheckersCellType';
import { CheckersUnitType } from './CheckersUnitType';

export abstract class CheckersAction extends Action<CheckersCellType, CheckersUnitType, TwoPlayerUnitOwner, CheckersUnit> {
  protected runChanges(change: CheckersActionChange) {
    if (isRemovingActionChange(change)) {
      this.game.board.removeUnit(change);
    }

    if (isChangingActionChange(change)) {
      this.game.board.updateUnit(change);
    }

    if (isMovingActonChange(change)) {
      this.game.board.moveUnit(change);
    }
  }
}
