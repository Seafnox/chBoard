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
        target: this.game.board.getUnit(this.enemyPosition(path) || Vector2d.Zero)!,
      },
      {
        type: ActionChangeType.Move,
        entity: this.entity,
        to: this.nextPosition,
      },
    ];
  }

  get isActive(): boolean {
    const isKing = this.entity.type === CheckersUnitType.King;
    const isOwnerTurn = this.entity.owner === this.game.activeOwner;
    const path = this.path();
    const isPathExist = !path.some(position => !this.game.board.getCell(position));
    const hasEnemyPosition = !!this.enemyPosition(path);
    const hasOnlyOneEnemyInPath = path.filter(position => !!this.game.board.getUnit(position)).length === 1 && hasEnemyPosition;

    return this.isCorrectPriority && isKing && isOwnerTurn && isPathExist && hasOnlyOneEnemyInPath;
  }
}
