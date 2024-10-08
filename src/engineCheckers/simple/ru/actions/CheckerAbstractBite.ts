import { ActionChangeType } from '../../../../engine/actionChanges/ActionChangeType';
import { Vector2d } from '../../../../engine/Vector2d';
import { CheckersBiteAction } from '../../commons/CheckersBiteAction';
import { CheckersRule } from '../../commons/CheckersRule';
import { CheckersUnitType } from '../../commons/CheckersUnitType';
import { CheckersUnit, CheckersGame, CheckersCommonActionChange } from '../CheckersRuTypings';
import { SwitchToKingActionChange } from './changes/SwitchToKingActionChange';

export abstract class CheckerAbstractBite extends CheckersBiteAction {
  constructor(
    public readonly game: CheckersGame,
    public readonly rule: CheckersRule,
    public readonly entity: CheckersUnit,
    public readonly mostKillPriority: boolean,
  ) {
    super(game, rule, entity, mostKillPriority, 2);
  }

  get changes(): CheckersCommonActionChange<CheckersUnit>[] {
    const path = this.path();
    return [
      {
        type: ActionChangeType.Remove,
        source: this.entity,
        target: this.game.board.getUnit(this.enemyPosition(path) || Vector2d.NaN)!,
      },
      {
        type: ActionChangeType.Move,
        source: this.entity,
        to: this.nextPosition,
      },
      ...SwitchToKingActionChange.createIfAvailable(this.game, this.entity, this.nextPosition),
    ];
  }

  get isActive(): boolean {
    return this.isCorrectPriority && this.isAvailable;
  }

  get isAvailable(): boolean {
    const isChecker = this.entity.type === CheckersUnitType.Checker;

    return super.isAvailable && isChecker;
  }
}
