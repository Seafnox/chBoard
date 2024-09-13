import { Vector2d } from '../../../engine/Vector2d';
import { CheckersGame, CheckersUnit, CheckersAvailableAction } from '../ru/CheckersRuTypings';
import { CheckersAction } from './CheckersAction';
import { CheckersRule } from './CheckersRule';

export abstract class CheckersBiteAction extends CheckersAction {
  constructor(
    public readonly game: CheckersGame,
    public readonly rule: CheckersRule,
    public readonly entity: CheckersUnit,
    public readonly mostKillPriority: boolean,
    public readonly distance: number,
  ) {
    super(game, rule, entity);
  }

  get priority(): number {
    return !this.mostKillPriority ? 2 : 1 + this.availableKills();
  }

  get shouldSwitchTurn(): boolean {
    const biteActions = this.entity.actions
      .filter<CheckersBiteAction>((action: CheckersAvailableAction): action is CheckersBiteAction => action instanceof CheckersBiteAction)
    ;
    return !biteActions.some(action => action.isAvailable);
  }

  get nextPosition(): Vector2d {
    return this.entity.position.add(this.biteDirection.scale(this.distance));
  }

  get isAvailable(): boolean {
    const isOwnerTurn = this.entity.owner === this.game.activeOwner;
    const path = this.path();
    const isPathExist = !path.some(position => !this.game.board.getCell(position));
    const hasEnemyPosition = !!this.enemyPosition(path);
    const hasOnlyOneEnemyInPath = hasEnemyPosition && path.filter(position => !!this.game.board.getUnit(position)).length === 1;

    return !this.entity.isDead && isOwnerTurn && isPathExist && hasOnlyOneEnemyInPath;
  }

  availableKills(): number {
    if (!this.isAvailable) {
      return 0;
    }

    const virtualGame = this.game.clone();
    const virtualEntity = virtualGame.board.getUnit(this.entity.position)!;
    const virtualAction = virtualEntity.actions
      .find(action => {
        return action instanceof CheckersBiteAction && action.constructor.name === this.constructor.name && action.distance === this.distance;
      }) as typeof this;

    virtualAction._run(true);

    if (this.shouldSwitchTurn) {
      return 1;
    }

    const availableActions = virtualEntity.actions
      .filter<CheckersBiteAction>((action: CheckersAvailableAction): action is CheckersBiteAction => action instanceof CheckersBiteAction)
      .filter(action => action.isAvailable);

    if (availableActions.length === 0) {
      return 1;
    }

    const availableKills = availableActions.map(action => action.availableKills());
    const maxKills = Math.max(...availableKills);
    return 1 + maxKills;
  }

  protected enemyPosition(path: Vector2d[]): Vector2d | undefined {
    const unitOwner = this.entity.owner;
    const enemyPath = path.slice(0,-1);

    return enemyPath.find(position => {
      const unit = this.game.board.getUnit(position);
      return !!unit && unit.owner !== unitOwner;
    });
  }

  protected path(): Vector2d[] {
    const entityPosition = this.entity.position.add(this.biteDirection);
    const biteDirection = this.biteDirection;
    return Array(this.distance).fill(null).map((_, index) => entityPosition.add(biteDirection.scale(index)));
  }

  public abstract get biteDirection(): Vector2d;
}
