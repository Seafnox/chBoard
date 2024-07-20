import { Unit } from '../../../../engine/Unit';
import { CheckersRule } from '../../commons/CheckersRule';
import { CheckerBiteBackLeft } from '../actions/CheckerBiteBackLeft';
import { CheckerBiteBackRight } from '../actions/CheckerBiteBackRight';
import { CheckerBiteFrontLeft } from '../actions/CheckerBiteFrontLeft';
import { CheckerBiteFrontRight } from '../actions/CheckerBiteFrontRight';
import { CheckersUnit, CheckersInteractiveEntity, CheckersAvailableAction, CheckersGame } from '../CheckersRuTypings';
import { CheckersUnitType } from '../../commons/CheckersUnitType';
import { CheckerMoveFrontLeft } from '../actions/CheckerMoveFrontLeft';
import { CheckerMoveFrontRight } from '../actions/CheckerMoveFrontRight';

export class RulesForChecker extends CheckersRule {
  isSuitable(entity: CheckersInteractiveEntity): entity is CheckersUnit {
    return entity instanceof Unit && entity.type === CheckersUnitType.Checker;
  }

  getAction(
    entity: CheckersUnit,
    game: CheckersGame,
  ): CheckersAvailableAction[] {
    return [
      // TODO make commons move logic
      new CheckerMoveFrontLeft(entity, game),
      new CheckerMoveFrontRight(entity, game),
      new CheckerBiteFrontLeft(entity, game),
      new CheckerBiteFrontRight(entity, game),
      new CheckerBiteBackLeft(entity, game),
      new CheckerBiteBackRight(entity, game),
    ];
  }
}
