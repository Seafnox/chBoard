import { ActionChangeType } from '../../../../engine/actionChanges/ActionChangeType';
import { CommonActionChange } from '../../../../engine/actionChanges/CommonActionChange';
import { Vector2d } from '../../../../engine/Vector2d';
import { CheckersAction } from '../../commons/CheckersAction';
import { CheckersUnit } from '../CheckersRuTypings';

export abstract class CheckersAbstractMove extends CheckersAction {
  get priority(): number {
    return 1;
  }

  get isActive(): boolean {
    const isOwnerTurn = this.entity.owner === this.game.turnManager.activeOwner;
    const hasNextCell = !!this.game.board.getCell(this.nextPosition);
    const hasAnyUnit = !!this.game.board.getUnit(this.nextPosition);

    return isOwnerTurn && hasNextCell && !hasAnyUnit;
  }

  get changes(): CommonActionChange<CheckersUnit>[] {
    return [
      {
        type: ActionChangeType.Move,
        entity: this.entity,
        to: this.nextPosition,
      }
    ];
  }

  protected get nextPosition(): Vector2d {
    return this.entity.position.add(this.moveDirection);
  }

  protected abstract get moveDirection(): Vector2d;

  // FIXME refactor to changes
  _run(): void {
    const nextCell = this.game.board.getCell(this.nextPosition);

    if (!nextCell) {
      throw new Error('No next cell');
    }

    // TODO check can switch to king

    this.game.board.moveUnit(this.entity, nextCell);
    this.game.turnManager.nextTurn();
  }

}
