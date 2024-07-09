import { Action } from '../../../../engine/Action';
import { ActionChangeType } from '../../../../engine/actionChanges/ActionChangeType';
import { CommonActionChange } from '../../../../engine/actionChanges/CommonActionChange';
import { Vector2d } from '../../../../engine/Vector2d';
import { CheckersCellType } from '../../commons/CheckersCellType';
import { CheckersUnit } from '../CheckersRuTypings';
import { CheckersUnitOwner } from '../../commons/CheckersUnitOwner';
import { CheckersUnitType } from '../../commons/CheckersUnitType';

export class SimpleMoveRight extends Action<CheckersCellType, CheckersUnitType, CheckersUnitOwner, CheckersUnit> {
  get priority(): number {
    return 1;
  }

  get isActive(): boolean {
    // FIXME check if unit can move
    return this.entity.owner === this.game.turnManager.activeOwner;
  }

  get changes(): CommonActionChange<CheckersUnit>[] {
    return [
      {
        type: ActionChangeType.Move,
        entity: this.entity,
        to: this.entity.position.add(this.moveDirection),
      }
    ];
  }

  private get moveDirection() {
    return this.entity.owner === CheckersUnitOwner.Black
      ? Vector2d.Up.add(Vector2d.Right)
      : Vector2d.Down.add(Vector2d.Right);
  }

// FIXME refactor to changes
  public _run(): void {
    const nextPosition = this.entity.position.add(this.moveDirection);
    const nextCell = this.game.board.getCell(nextPosition);

    if (nextCell) {
      this.entity.moveTo(nextCell);
    }

    // TODO check can switch to king

    this.game.turnManager.nextTurn();
  }

}
