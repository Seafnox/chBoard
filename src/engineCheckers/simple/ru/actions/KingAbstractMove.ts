import { ActionChangeType } from '../../../../engine/actionChanges/ActionChangeType';
import { CommonActionChange } from '../../../../engine/actionChanges/CommonActionChange';
import { isMovingActonChange } from '../../../../engine/actionChanges/isMovingActonChange';
import { isSwitchingTurnChange } from '../../../../engine/actionChanges/isSwitchingTurnChange';
import { Vector2d } from '../../../../engine/Vector2d';
import { CheckersAction } from '../../commons/CheckersAction';
import { CheckersUnitType } from '../../commons/CheckersUnitType';
import { CheckersUnit, CheckersGame } from '../CheckersRuTypings';
import { MoveRulesForKing } from '../rules/MoveRulesForKing';

export abstract class KingAbstractMove extends CheckersAction {
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

  get isActive(): boolean {
    const isKing = this.entity.type === CheckersUnitType.King;
    const isOwnerTurn = this.entity.owner === this.game.turnManager.activeOwner;
    const path = this.path();
    const isPathExist = !path.some(position => !this.game.board.getCell(position));
    const isPathClear = !path.some(position => !!this.game.board.getUnit(position));

    return this.isCorrectPriority && isKing && isOwnerTurn && isPathExist && isPathClear;
  }

  get changes(): CommonActionChange<CheckersUnit>[] {
    return [
      {
        type: ActionChangeType.Move,
        entity: this.entity,
        to: this.nextPosition,
      },
      {
        type: ActionChangeType.SwitchTurn,
        entity: this.entity,
      },
    ];
  }

  protected get nextPosition(): Vector2d {
    return this.entity.position.add(this.moveDirection.scale(this.distance));
  }

  protected abstract get moveDirection(): Vector2d;

  _run(): void {
    const moveAction = this.changes.find(isMovingActonChange);
    const switchTurnAction = this.changes.find(isSwitchingTurnChange);

    if (moveAction) {
      this.game.board.moveUnit(moveAction);
    }

    if (switchTurnAction) {
      this.game.turnManager.nextTurn();
    }
  }

  private path(distanceCorrection: number = 0): Vector2d[] {
    const entityPosition = this.entity.position;
    const biteDirection = this.moveDirection;
    return Array(this.distance + distanceCorrection).fill(null).map((_, index) => entityPosition.add(biteDirection.scale(index)));
  }
}
