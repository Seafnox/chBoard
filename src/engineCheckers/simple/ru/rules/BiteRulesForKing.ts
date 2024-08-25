import { Unit } from '../../../../engine/Unit';
import { CheckersRule } from '../../commons/CheckersRule';
import { CheckersUnit, CheckersInteractiveEntity, CheckersAvailableAction } from '../CheckersRuTypings';

export class BiteRulesForKing extends CheckersRule {
  isSuitable(entity: CheckersInteractiveEntity): entity is CheckersUnit {
    return entity instanceof Unit;
  }

  getActions(
    //game: CheckersGame,
    //entity: CheckersUnit,
  ): CheckersAvailableAction[] {
    return [
// TODO make rule for king biting and moving. Also check is there other bitings
      //new CheckerBiteFrontLeft(game, this, entity),
      //new CheckerBiteFrontRight(game, this, entity),
      //new CheckerBiteBackLeft(game, this, entity),
      //new CheckerBiteBackRight(game, this, entity),
    ];
  }
}
