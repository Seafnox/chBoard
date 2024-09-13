import { Vector2d } from '../../../engine/Vector2d';
import { CheckersGame, CheckersUnit } from '../ru/CheckersRuTypings';
import { MoveRulesForKing } from '../ru/rules/MoveRulesForKing';
import { CheckersAction } from './CheckersAction';

export abstract class CheckersMoveAction extends CheckersAction {
  constructor(
    public readonly game: CheckersGame,
    public readonly rule: MoveRulesForKing,
    public readonly entity: CheckersUnit,
    public readonly distance: number,
  ) {
    super(game, rule, entity);
  }

  get priority(): number {
    return 1;
  }

  get isAvailable(): boolean {
    const isOwnerTurn = this.entity.owner === this.game.activeOwner;
    const path = this.path();
    const isPathExist = !path.some(position => !this.game.board.getCell(position));
    const isPathClear = !path.some(position => !!this.game.board.getUnit(position));

    return isOwnerTurn && isPathExist && isPathClear;
  }

  protected get shouldSwitchTurn(): boolean {
    return true;
  }

  protected get nextPosition(): Vector2d {
    return this.entity.position.add(this.moveDirection.scale(this.distance));
  }

  protected abstract get moveDirection(): Vector2d;

  protected path(): Vector2d[] {
    const entityPosition = this.entity.position.add(this.moveDirection);
    const moveDirection = this.moveDirection;
    return Array(this.distance).fill(null).map((_, index) => entityPosition.add(moveDirection.scale(index)));
  }
}
