import { ActionChangeType } from '../../../../engine/actionChanges/ActionChangeType';
import { CheckersMoveAction } from '../../commons/CheckersMoveAction';
import { CheckersUnitType } from '../../commons/CheckersUnitType';
import { CheckersCommonActionChange } from '../CheckersRuTypings';

export abstract class KingAbstractMove extends CheckersMoveAction {

  get isActive(): boolean {
    return this.isCorrectPriority && this.isAvailable;
  }

  get isAvailable(): boolean {
    const isKing = this.entity.type === CheckersUnitType.King;

    return super.isAvailable && isKing;
  }

  get changes(): CheckersCommonActionChange[] {
    return [
      {
        type: ActionChangeType.Move,
        sourceId: this.entity.id,
        targetId: this.entity.id,
        to: this.nextPosition.toString(),
      },
    ];
  }
}
