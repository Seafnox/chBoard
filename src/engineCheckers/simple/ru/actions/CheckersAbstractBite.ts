import { ActionChangeType } from '../../../../engine/actionChanges/ActionChangeType';
import { CommonActionChange } from '../../../../engine/actionChanges/CommonActionChange';
import { MoveActionChange } from '../../../../engine/actionChanges/MoveActionChange';
import { RemoveActionChange } from '../../../../engine/actionChanges/RemoveActionChange';
import { Vector2d } from '../../../../engine/Vector2d';
import { CheckersAction } from '../../commons/CheckersAction';
import { CheckersUnit } from '../CheckersRuTypings';

export abstract class CheckersAbstractBite extends CheckersAction {
  get priority(): number {
    return 2;
  }

  get changes(): CommonActionChange<CheckersUnit>[] {
    return [
      {
        type: ActionChangeType.Remove,
        entity: this.entity,
        target: this.game.board.getUnit(this.nextPosition)!,
      },
      {
        type: ActionChangeType.Move,
        entity: this.entity,
        to: this.next2ndPosition,
      }
    ];
  }

  get isActive(): boolean {
    const isOwnerTurn = this.entity.owner === this.game.turnManager.activeOwner;
    const hasFirstNextCell = !!this.game.board.getCell(this.nextPosition);
    const hasSecondNextCell = !!this.game.board.getCell(this.next2ndPosition);
    const firstUnit = this.game.board.getUnit(this.nextPosition);
    const hasFirstAnyUnit = !!firstUnit;
    const isFirstEnemyUnit = firstUnit?.owner !== this.entity.owner;
    const hasSecondAnyUnit = !!this.game.board.getUnit(this.next2ndPosition);

    return isOwnerTurn && hasFirstNextCell && hasSecondNextCell && !hasSecondAnyUnit && hasFirstAnyUnit && isFirstEnemyUnit;
  }

  protected get nextPosition(): Vector2d {
    return this.entity.position.add(this.biteDirection);
  }

  protected get next2ndPosition(): Vector2d {
    return this.nextPosition.add(this.biteDirection);
  }

  protected abstract get biteDirection(): Vector2d;

  // FIXME refactor to changes
  protected _run(): void {
    const biteAction = this.changes[0] as RemoveActionChange<CheckersUnit>;
    const moveAction = this.changes[1] as MoveActionChange<CheckersUnit>;
    const nextCell = this.game.board.getCell(this.nextPosition);

    if (!nextCell) {
      throw new Error('No next cell');
    }

    const enemyUnit = this.game.board.getUnit(this.nextPosition);

    if (!enemyUnit) {
      throw new Error('No enemy unit');
    }

    this.game.board.moveUnit(this.entity, moveAction);
    this.game.board.removeUnit(enemyUnit, biteAction);
    this.game.turnManager.nextTurn();
  }
}
