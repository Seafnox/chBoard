import { ActionChangeType } from '../../../../engine/actionChanges/ActionChangeType';
import { CommonActionChange } from '../../../../engine/actionChanges/CommonActionChange';
import { Vector2d } from '../../../../engine/Vector2d';
import { CheckersAction } from '../../commons/CheckersAction';
import { CheckersUnitType } from '../../commons/CheckersUnitType';
import { CheckersUnit, CheckersGame } from '../CheckersRuTypings';
import { MoveRulesForKing } from '../rules/MoveRulesForKing';

export abstract class KingAbstractBite extends CheckersAction {
  constructor(
    public readonly game: CheckersGame,
    public readonly rule: MoveRulesForKing,
    public readonly entity: CheckersUnit,
    public readonly distance: number,
  ) {
    super(game, rule, entity);
  }

  get priority(): number {
    return 2;
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

  protected get shouldSwitchTurn(): boolean {
    const featureEntity = this.entity.clone();
    const actions = this.rule.getActions(this.game, featureEntity);
    return !actions.some(action => action.isActive);
  }

  protected enemyPosition(path: Vector2d[]): Vector2d | undefined {
    const unitOwner = this.entity.owner;
    const enemyPath = path.slice(0,-1);

    return enemyPath.find(position => {
      const unit = this.game.board.getUnit(position);
      return !!unit && unit.owner !== unitOwner;
    });
  }

  protected get nextPosition(): Vector2d {
    return this.entity.position.add(this.biteDirection.scale(this.distance));
  }

  protected abstract get biteDirection(): Vector2d;

  private path(): Vector2d[] {
    const entityPosition = this.entity.position.add(this.biteDirection);
    const biteDirection = this.biteDirection;
    return Array(this.distance).fill(null).map((_, index) => entityPosition.add(biteDirection.scale(index)));
  }
}
