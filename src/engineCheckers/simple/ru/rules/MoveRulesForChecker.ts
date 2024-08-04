import { Unit } from '../../../../engine/Unit';
import { CheckersRule } from '../../commons/CheckersRule';
import { CheckersUnit, CheckersInteractiveEntity, CheckersAvailableAction, CheckersGame } from '../CheckersRuTypings';
import { CheckersUnitType } from '../../commons/CheckersUnitType';
import { CheckerMoveFrontLeft } from '../actions/CheckerMoveFrontLeft';
import { CheckerMoveFrontRight } from '../actions/CheckerMoveFrontRight';

export class MoveRulesForChecker extends CheckersRule {
  isSuitable(entity: CheckersInteractiveEntity): entity is CheckersUnit {
    return entity instanceof Unit && entity.type === CheckersUnitType.Checker;
  }

  getActions(
    game: CheckersGame,
    entity: CheckersUnit,
  ): CheckersAvailableAction[] {
    return [
      new CheckerMoveFrontLeft(game, this, entity),
      new CheckerMoveFrontRight(game, this, entity),
    ];
  }
}
