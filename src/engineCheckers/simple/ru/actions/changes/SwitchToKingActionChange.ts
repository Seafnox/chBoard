import { ActionChangeType } from '../../../../../engine/actionChanges/ActionChangeType';
import { ChangingActionChange } from '../../../../../engine/actionChanges/ChangingActionChange';
import { Vector2d } from '../../../../../engine/Vector2d';
import { CheckersUnitOwner } from '../../../commons/CheckersUnitOwner';
import { CheckersUnitType } from '../../../commons/CheckersUnitType';
import { CheckersUnit, CheckersGame } from '../../CheckersRuTypings';

export class SwitchToKingActionChange implements ChangingActionChange<CheckersUnit> {
  public readonly type = ActionChangeType.Change;

  constructor(
    public readonly entity: CheckersUnit,
    public readonly target: CheckersUnit,
    public readonly game: CheckersGame,
  ) {}

  static createIfAvailable(game: CheckersGame, entity: CheckersUnit, nextPosition: Vector2d): SwitchToKingActionChange[] {
    if (SwitchToKingActionChange.isAvailable(game, entity, nextPosition)) {
      return [new SwitchToKingActionChange(entity, entity, game)];
    }

    return [];
  }

  static isAvailable(game: CheckersGame, entity: CheckersUnit, nextPosition: Vector2d): boolean {
    return entity.type === CheckersUnitType.Checker && SwitchToKingActionChange.isSuitable(game, entity, nextPosition);
  }

  static isSuitable(game: CheckersGame, entity: CheckersUnit, nextPosition: Vector2d): boolean {
    const shouldBeWhiteKing = entity.owner === CheckersUnitOwner.White
      && nextPosition.y === 0;
    const shouldBeBlackKing = entity.owner === CheckersUnitOwner.Black
      && nextPosition.y === game.initialConfig.height - 1;

    return shouldBeWhiteKing || shouldBeBlackKing;
  }

  update(target: CheckersUnit): void {
    target.changeType(CheckersUnitType.King);
  }
}
