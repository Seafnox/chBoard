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
    const actions = this.rule.getActions(this.game, this.entity);
    return !actions.some(action => action.isActive);
  }

  get nextPosition(): Vector2d {
    return this.entity.position.add(this.biteDirection.scale(this.distance));
  }

  availableKills(): number {
    const virtualGame = this.game.clone();
    const virtualEntity = virtualGame.board.getUnit(this.entity.position)!;
    const virtualAction = virtualEntity.actions
      .find(
        action => action.constructor.name === this.constructor.name
      ) as typeof this;

    virtualAction._run();

    const availableActions = virtualEntity.actions
      .filter(action => action.isActive)
      .filter<CheckersBiteAction>((action: CheckersAvailableAction): action is CheckersBiteAction => action instanceof CheckersBiteAction);

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
