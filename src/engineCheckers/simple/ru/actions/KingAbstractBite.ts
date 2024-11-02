import { ActionChangeType } from '../../../../engine/actionChanges/ActionChangeType';
import { Vector2d } from '../../../../engine/Vector2d';
import { CheckersBiteAction } from '../../commons/CheckersBiteAction';
import { CheckersUnitType } from '../../commons/CheckersUnitType';
import { CheckersCommonActionChange } from '../CheckersRuTypings';

export abstract class KingAbstractBite extends CheckersBiteAction {
  get changes(): CheckersCommonActionChange[] {
    const path = this.path();
    return [
      {
        type: ActionChangeType.Remove,
        sourceId: this.entity.id,
        targetId: this.game.board.getUnit(this.enemyPosition(path) || Vector2d.NaN)!.id,
      },
      {
        type: ActionChangeType.Move,
        sourceId: this.entity.id,
        targetId: this.entity.id,
        to: this.nextPosition.toString(),
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
