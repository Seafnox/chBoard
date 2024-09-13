import { ActionChangeType } from '../../../../engine/actionChanges/ActionChangeType';
import { CommonActionChange } from '../../../../engine/actionChanges/CommonActionChange';
import { Vector2d } from '../../../../engine/Vector2d';
import { CheckersBiteAction } from '../../commons/CheckersBiteAction';
import { CheckersUnitType } from '../../commons/CheckersUnitType';
import { CheckersUnit } from '../CheckersRuTypings';

export abstract class KingAbstractBite extends CheckersBiteAction {
  get changes(): CommonActionChange<CheckersUnit>[] {
    const path = this.path();
    return [
      {
        type: ActionChangeType.Remove,
        entity: this.entity,
        target: this.game.board.getUnit(this.enemyPosition(path) || Vector2d.NaN)!,
      },
      {
        type: ActionChangeType.Move,
        entity: this.entity,
        to: this.nextPosition,
      },
    ];
  }

  get isActive(): boolean {
    return this.isCorrectPriority && this.isAvailable;
  }

  get isAvailable(): boolean {
    const isKing = this.entity.type === CheckersUnitType.King;

    return super.isAvailable && isKing;
  }
}
