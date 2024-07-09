import { Action } from '../../../../engine/Action';
import { ActionChangeType } from '../../../../engine/actionChanges/ActionChangeType';
import { CommonActionChange } from '../../../../engine/actionChanges/CommonActionChange';
import { Vector2d } from '../../../../engine/Vector2d';
import { CheckersCellType } from '../../commons/CheckersCellType';
import { CheckersUnit } from '../CheckersRuTypings';
import { CheckersUnitOwner } from '../../commons/CheckersUnitOwner';
import { CheckersUnitType } from '../../commons/CheckersUnitType';

export class SimpleMoveLeft extends Action<CheckersCellType, CheckersUnitType, CheckersUnitOwner, CheckersUnit> {
  get priority(): number {
    return 1;
  }

  get isActive(): boolean {
    // FIXME check if unit can move
    return true;
  }

  get changes(): CommonActionChange<CheckersUnit>[] {
    const moveDirection = this.entity.owner === CheckersUnitOwner.Black
      ? Vector2d.Up.add(Vector2d.Left)
      : Vector2d.Down.add(Vector2d.Left);

    return [
      {
        type: ActionChangeType.Move,
        entity: this.entity,
        to: this.entity.position.add(moveDirection),
      }
    ];
  }

  // FIXME refactor to changes
  public run(): void {
    const moveDirection = this.entity.owner === CheckersUnitOwner.Black
      ? Vector2d.Up.add(Vector2d.Left)
      : Vector2d.Down.add(Vector2d.Left);
    const nextPosition = this.entity.position.add(moveDirection);
    const nextCell = this.board.getCell(nextPosition);

    if (nextCell) {
      this.entity.moveTo(nextCell);
    }

    // TODO check can switch to king
  }

}
