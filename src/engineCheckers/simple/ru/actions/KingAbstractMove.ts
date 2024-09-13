import { ActionChangeType } from '../../../../engine/actionChanges/ActionChangeType';
import { CommonActionChange } from '../../../../engine/actionChanges/CommonActionChange';
import { CheckersMoveAction } from '../../commons/CheckersMoveAction';
import { CheckersUnitType } from '../../commons/CheckersUnitType';
import { CheckersUnit } from '../CheckersRuTypings';

export abstract class KingAbstractMove extends CheckersMoveAction {

  get isActive(): boolean {
    return this.isCorrectPriority && this.isAvailable;
  }

  get isAvailable(): boolean {
    const isKing = this.entity.type === CheckersUnitType.King;

    return super.isAvailable && isKing;
  }

  get changes(): CommonActionChange<CheckersUnit>[] {
    return [
      {
        type: ActionChangeType.Move,
        entity: this.entity,
        to: this.nextPosition,
      },
    ];
  }
}
