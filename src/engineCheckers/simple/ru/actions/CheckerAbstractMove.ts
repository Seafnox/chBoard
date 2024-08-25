import { ActionChangeType } from '../../../../engine/actionChanges/ActionChangeType';
import { CommonActionChange } from '../../../../engine/actionChanges/CommonActionChange';
import { isChangingActionChange } from '../../../../engine/actionChanges/isChangingActionChange';
import { isMovingActonChange } from '../../../../engine/actionChanges/isMovingActonChange';
import { isSwitchingTurnChange } from '../../../../engine/actionChanges/isSwitchingTurnChange';
import { Vector2d } from '../../../../engine/Vector2d';
import { CheckersAction } from '../../commons/CheckersAction';
import { CheckersUnitType } from '../../commons/CheckersUnitType';
import { CheckersUnit } from '../CheckersRuTypings';
import { SwitchToKingActionChange } from './changes/SwitchToKingActionChange';

export abstract class CheckerAbstractMove extends CheckersAction {
  get priority(): number {
    return 1;
  }

  get isActive(): boolean {
    const isChecker = this.entity.type === CheckersUnitType.Checker;
    const isOwnerTurn = this.entity.owner === this.game.turnManager.activeOwner;
    const hasNextCell = !!this.game.board.getCell(this.nextPosition);
    const hasAnyUnit = !!this.game.board.getUnit(this.nextPosition);

    return this.isCorrectPriority && isChecker && isOwnerTurn && hasNextCell && !hasAnyUnit;
  }

  get changes(): CommonActionChange<CheckersUnit>[] {
    return [
      {
        type: ActionChangeType.Move,
        entity: this.entity,
        to: this.nextPosition,
      },
      ...SwitchToKingActionChange.createIfAvailable(this.game, this.entity, this.nextPosition),
      {
        type: ActionChangeType.SwitchTurn,
        entity: this.entity,
      },
    ];
  }

  protected get nextPosition(): Vector2d {
    return this.entity.position.add(this.moveDirection);
  }

  protected abstract get moveDirection(): Vector2d;

  _run(): void {
    const moveAction = this.changes.find(isMovingActonChange);
    const changingAction = this.changes.find(isChangingActionChange);
    const switchTurnAction = this.changes.find(isSwitchingTurnChange);

    if (moveAction) {
      this.game.board.moveUnit(moveAction);
    }

    if (changingAction) {
      this.game.board.updateUnit(changingAction);
    }

    if (switchTurnAction) {
      this.game.turnManager.nextTurn();
    }
  }

}
