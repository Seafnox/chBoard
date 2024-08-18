import { Unit } from '../../../../engine/Unit';
import { CheckersRule } from '../../commons/CheckersRule';
import { CheckerBiteBackLeft } from '../actions/CheckerBiteBackLeft';
import { CheckerBiteBackRight } from '../actions/CheckerBiteBackRight';
import { CheckerBiteFrontLeft } from '../actions/CheckerBiteFrontLeft';
import { CheckerBiteFrontRight } from '../actions/CheckerBiteFrontRight';
import { CheckersUnit, CheckersInteractiveEntity, CheckersAvailableAction, CheckersGame } from '../CheckersRuTypings';

export class BiteRulesForChecker extends CheckersRule {
  isSuitable(entity: CheckersInteractiveEntity): entity is CheckersUnit {
    return entity instanceof Unit;
  }

  getActions(
    game: CheckersGame,
    entity: CheckersUnit,
  ): CheckersAvailableAction[] {
    return [
      new CheckerBiteFrontLeft(game, this, entity),
      new CheckerBiteFrontRight(game, this, entity),
      new CheckerBiteBackLeft(game, this, entity),
      new CheckerBiteBackRight(game, this, entity),
    ];
  }
}
