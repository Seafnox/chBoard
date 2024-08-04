import { ActionChangeType } from '../../../../engine/actionChanges/ActionChangeType';
import { CommonActionChange } from '../../../../engine/actionChanges/CommonActionChange';
import { isChangingActionChange } from '../../../../engine/actionChanges/isChangingActionChange';
import { isMovingActonChange } from '../../../../engine/actionChanges/isMovingActonChange';
import { isRemovingActionChange } from '../../../../engine/actionChanges/isRemovingActionChange';
import { isSwitchingTurnChange } from '../../../../engine/actionChanges/isSwitchingTurnChange';
import { Vector2d } from '../../../../engine/Vector2d';
import { CheckersAction } from '../../commons/CheckersAction';
import { CheckersUnit } from '../CheckersRuTypings';
import { SwitchToKingActionChange } from './changes/SwitchToKingActionChange';

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
      ...SwitchToKingActionChange.createIfAvailable(this.game, this.entity, this.next2ndPosition),
      ...(this.shouldSwitchTurn ? [this.switchTurnActionChange] : []),
    ];
  }

  get shouldSwitchTurn(): boolean {
    const featureEntity = this.entity.clone();
    featureEntity.cell = this.game.board.getCell(this.next2ndPosition)!;
    const actions = this.rule.getActions(this.game, featureEntity);
    return !actions.some(action => action.isActive);
  }

  get switchTurnActionChange(): CommonActionChange<CheckersUnit> {
    return {
      type: ActionChangeType.SwitchTurn,
      entity: this.entity,
    };
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
    const biteAction = this.changes.find(isRemovingActionChange);
    const moveAction = this.changes.find(isMovingActonChange);
    const changingAction = this.changes.find(isChangingActionChange);
    const switchTurnAction = this.changes.find(isSwitchingTurnChange);

    if (biteAction) {
      this.game.board.removeUnit(biteAction);
    }

    if (moveAction) {
      this.game.board.moveUnit(moveAction);
    }


    if (changingAction) {
      this.game.board.updateUnit(changingAction);
    }

    if (switchTurnAction) {
      this.game.turnManager.nextTurn();
    }
  }
}
