import { ActionChangeType } from '../../../../engine/actionChanges/ActionChangeType';
import { CommonActionChange } from '../../../../engine/actionChanges/CommonActionChange';
import { Vector2d } from '../../../../engine/Vector2d';
import { CheckersBiteAction } from '../../commons/CheckersBiteAction';
import { CheckersRule } from '../../commons/CheckersRule';
import { CheckersUnitType } from '../../commons/CheckersUnitType';
import { CheckersUnit, CheckersGame } from '../CheckersRuTypings';
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
      ...SwitchToKingActionChange.createIfAvailable(this.game, this.entity, this.nextPosition),
    ];
  }

  get isActive(): boolean {
    const isChecker = this.entity.type === CheckersUnitType.Checker;
    const isOwnerTurn = this.entity.owner === this.game.activeOwner;
    const path = this.path();
    const isPathExist = !path.some(position => !this.game.board.getCell(position));
    const hasEnemyPosition = !!this.enemyPosition(path);
    const hasOnlyOneEnemyInPath = path.filter(position => !!this.game.board.getUnit(position)).length === 1 && hasEnemyPosition;

    return this.isCorrectPriority && isChecker && isOwnerTurn && isPathExist && hasOnlyOneEnemyInPath;
  }
}
