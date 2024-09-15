import { Action } from '../../../engine/Action';
import { ActionChange } from '../../../engine/actionChanges/ActionChange';
import { isChangingActionChange } from '../../../engine/actionChanges/isChangingActionChange';
import { isMovingActonChange } from '../../../engine/actionChanges/isMovingActonChange';
import { isRemovingActionChange } from '../../../engine/actionChanges/isRemovingActionChange';
import { CheckersUnit } from '../ru/CheckersRuTypings';
import { CheckersCellType } from './CheckersCellType';
import { CheckersUnitOwner } from './CheckersUnitOwner';
import { CheckersUnitType } from './CheckersUnitType';

export abstract class CheckersAction extends Action<CheckersCellType, CheckersUnitType, CheckersUnitOwner, CheckersUnit> {
  protected runChanges(change: ActionChange<CheckersUnit>) {
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
