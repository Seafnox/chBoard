import { Unit } from '../../../../engine/Unit';
import { CheckersRule } from '../../commons/CheckersRule';
import { CheckersUnit, CheckersInteractiveEntity, CheckersUnitAction, CheckersGame } from '../CheckersRuTypings';
import { CheckerMoveFrontLeft } from '../actions/CheckerMoveFrontLeft';
import { CheckerMoveFrontRight } from '../actions/CheckerMoveFrontRight';

export class MoveRulesForChecker extends CheckersRule {
  isSuitable(entity: CheckersInteractiveEntity): entity is CheckersUnit {
    return entity instanceof Unit;
  }

  getActions(
    game: CheckersGame,
    entity: CheckersUnit,
  ): CheckersUnitAction[] {
    return [
      new CheckerMoveFrontLeft(game, this, entity),
      new CheckerMoveFrontRight(game, this, entity),
    ];
  }
}
