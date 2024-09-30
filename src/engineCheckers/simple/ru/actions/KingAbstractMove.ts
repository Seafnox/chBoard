import { ActionChangeType } from '../../../../engine/actionChanges/ActionChangeType';
import { CheckersMoveAction } from '../../commons/CheckersMoveAction';
import { CheckersUnitType } from '../../commons/CheckersUnitType';
import { CheckersCommonActionChange, CheckersUnit } from '../CheckersRuTypings';

export abstract class KingAbstractMove extends CheckersMoveAction {

  get isActive(): boolean {
    return this.isCorrectPriority && this.isAvailable;
  }

  get isAvailable(): boolean {
    const isKing = this.entity.type === CheckersUnitType.King;

    return super.isAvailable && isKing;
  }

  get changes(): CheckersCommonActionChange<CheckersUnit>[] {
    return [
      {
        type: ActionChangeType.Move,
        source: this.entity,
        to: this.nextPosition,
      },
    ];
  }
}
