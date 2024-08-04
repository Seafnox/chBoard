import { ActionChangeType } from '../../../../engine/actionChanges/ActionChangeType';
import { CommonActionChange } from '../../../../engine/actionChanges/CommonActionChange';
import { isMoveActonChange } from '../../../../engine/actionChanges/isMoveActonChange';
import { isRemoveActionChange } from '../../../../engine/actionChanges/isRemoveActionChange';
import { Vector2d } from '../../../../engine/Vector2d';
import { CheckersAction } from '../../commons/CheckersAction';
import { CheckersUnitOwner } from '../../commons/CheckersUnitOwner';
import { CheckersUnitType } from '../../commons/CheckersUnitType';
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
      },
      ...(!this.shouldSwitchToKing ? [] : [this.switchToKingActionChange]),
    ];
  }

  get switchToKingActionChange(): CommonActionChange<CheckersUnit> {
    return {
      type: ActionChangeType.Change,
      entity: this.entity,
      target: this.entity,
      update: (target: CheckersUnit) => {
        target.changeType(CheckersUnitType.King);
      },
    };
  }

  get shouldSwitchToKing(): boolean {
    return this.entity.owner === CheckersUnitOwner.White && this.next2ndPosition.y === this.game.initialConfig.height - 1
      || this.entity.owner === CheckersUnitOwner.Black && this.next2ndPosition.y === 0;
  }

  get isActive(): boolean {
    const isOwnerTurn = this.entity.owner === this.game.turnManager.activeOwner;
    const hasFirstNextCell = !!this.game.board.getCell(this.nextPosition);
    const hasSecondNextCell = !!this.game.board.getCell(this.next2ndPosition);
    const firstUnit = this.game.board.getUnit(this.nextPosition);
    const hasFirstAnyUnit = !!firstUnit;
    const isFirstEnemyUnit = firstUnit?.owner !== this.entity.owner;
    const hasSecondAnyUnit = !!this.game.board.getUnit(this.next2ndPosition);

    return this.isCorrectPriority && isOwnerTurn && hasFirstNextCell && hasSecondNextCell && !hasSecondAnyUnit && hasFirstAnyUnit && isFirstEnemyUnit;
  }

  protected get nextPosition(): Vector2d {
    return this.entity.position.add(this.biteDirection);
  }

  protected get next2ndPosition(): Vector2d {
    return this.nextPosition.add(this.biteDirection);
  }

  protected abstract get biteDirection(): Vector2d;

  protected _run(): void {
    const biteAction = this.changes.find(isRemoveActionChange);
    const moveAction = this.changes.find(isMoveActonChange);

    if (!biteAction || !moveAction) {
      throw new Error('No bite or move action');
    }

    const nextCell = this.game.board.getCell(this.nextPosition);

    if (!nextCell) {
      throw new Error('No next cell');
    }

    const enemyUnit = this.game.board.getUnit(this.nextPosition);

    if (!enemyUnit) {
      throw new Error('No enemy unit');
    }

    // TODO check can switch to king
    this.game.board.moveUnit(this.entity, moveAction);
    this.game.board.removeUnit(enemyUnit, biteAction);
    // FIXME not always. there is can be more then one bite. Need to check are more bites available.
    this.game.turnManager.nextTurn();
  }
}
