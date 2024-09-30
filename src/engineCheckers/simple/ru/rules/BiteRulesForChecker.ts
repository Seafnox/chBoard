import { Unit } from '../../../../engine/Unit';
import { CheckersRule } from '../../commons/CheckersRule';
import { CheckerBiteBackLeft } from '../actions/CheckerBiteBackLeft';
import { CheckerBiteBackRight } from '../actions/CheckerBiteBackRight';
import { CheckerBiteFrontLeft } from '../actions/CheckerBiteFrontLeft';
import { CheckerBiteFrontRight } from '../actions/CheckerBiteFrontRight';
import { CheckersUnit, CheckersInteractiveEntity, CheckersUnitAction, CheckersGame } from '../CheckersRuTypings';

export class BiteRulesForChecker extends CheckersRule {
  isSuitable(entity: CheckersInteractiveEntity): entity is CheckersUnit {
    return entity instanceof Unit;
  }

  getActions(
    game: CheckersGame,
    entity: CheckersUnit,
  ): CheckersUnitAction[] {
    return [
      new CheckerBiteFrontLeft(game, this, entity, true),
      new CheckerBiteFrontRight(game, this, entity, true),
      new CheckerBiteBackLeft(game, this, entity, true),
      new CheckerBiteBackRight(game, this, entity, true),
    ];
  }
}
