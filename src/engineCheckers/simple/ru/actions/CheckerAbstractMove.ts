import { ActionChangeType } from '../../../../engine/actionChanges/ActionChangeType';
import { CommonActionChange } from '../../../../engine/actionChanges/CommonActionChange';
import { CheckersMoveAction } from '../../commons/CheckersMoveAction';
import { CheckersUnitType } from '../../commons/CheckersUnitType';
import { CheckersUnit, CheckersGame } from '../CheckersRuTypings';
import { MoveRulesForKing } from '../rules/MoveRulesForKing';
import { SwitchToKingActionChange } from './changes/SwitchToKingActionChange';

export abstract class CheckerAbstractMove extends CheckersMoveAction {
  constructor(
    public readonly game: CheckersGame,
    public readonly rule: MoveRulesForKing,
    public readonly entity: CheckersUnit,
  ) {
    super(game, rule, entity, 1);
  }

  get isActive(): boolean {
    return this.isCorrectPriority && this.isAvailable;
  }

  get isAvailable(): boolean {
    const isChecker = this.entity.type === CheckersUnitType.Checker;

    return super.isAvailable && isChecker;
  }

  get changes(): CommonActionChange<CheckersUnit>[] {
    return [
      {
        type: ActionChangeType.Move,
        entity: this.entity,
        to: this.nextPosition,
      },
      ...SwitchToKingActionChange.createIfAvailable(this.game, this.entity, this.nextPosition),
    ];
  }
}
