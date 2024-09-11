import { Action } from '../../../engine/Action';
import { ActionChangeType } from '../../../engine/actionChanges/ActionChangeType';
import { isChangingActionChange } from '../../../engine/actionChanges/isChangingActionChange';
import { isMovingActonChange } from '../../../engine/actionChanges/isMovingActonChange';
import { isRemovingActionChange } from '../../../engine/actionChanges/isRemovingActionChange';
import { SwitchingTurnChange } from '../../../engine/actionChanges/SwitchingTurnChange';
import { CheckersUnit } from '../ru/CheckersRuTypings';
import { CheckersCellType } from './CheckersCellType';
import { CheckersUnitOwner } from './CheckersUnitOwner';
import { CheckersUnitType } from './CheckersUnitType';

export abstract class CheckersAction extends Action<CheckersCellType, CheckersUnitType, CheckersUnitOwner, CheckersUnit> {
  protected get switchTurnAction(): SwitchingTurnChange<CheckersUnit> {
    return {
      type: ActionChangeType.SwitchTurn,
      entity: this.entity,
    }
  }

  protected abstract get shouldSwitchTurn(): boolean;

  protected _run(): void {
    const biteAction = this.changes.find(isRemovingActionChange);
    const changingAction = this.changes.find(isChangingActionChange);
    const moveAction = this.changes.find(isMovingActonChange);

    if (biteAction) {
      this.game.board.removeUnit(biteAction);
    }

    if (changingAction) {
      this.game.board.updateUnit(changingAction);
    }

    if (moveAction) {
      this.game.board.moveUnit(moveAction);
    }

    if (this.shouldSwitchTurn) {
      this.game.nextTurn(this.switchTurnAction);
    }
  }
}
