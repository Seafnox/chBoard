import { Unit } from '../../../../engine/Unit';
import { CheckersRule } from '../../commons/CheckersRule';
import { KingBiteBackLeft } from '../actions/KingBiteBackLeft';
import { KingBiteBackRight } from '../actions/KingBiteBackRight';
import { KingBiteFontLeft } from '../actions/KingBiteFrontLeft';
import { KingBiteFrontRight } from '../actions/KingBiteFrontRight';
import { CheckersUnit, CheckersInteractiveEntity, CheckersAvailableAction, CheckersGame } from '../CheckersRuTypings';

export class BiteRulesForKing extends CheckersRule {
  isSuitable(entity: CheckersInteractiveEntity): entity is CheckersUnit {
    return entity instanceof Unit;
  }

  getActions(
    game: CheckersGame,
    entity: CheckersUnit,
  ): CheckersAvailableAction[] {
    return [
      new KingBiteBackLeft(game, this, entity, 2),
      new KingBiteBackRight(game, this, entity, 2),
      new KingBiteFontLeft(game, this, entity, 2),
      new KingBiteFrontRight(game, this, entity, 2),

      new KingBiteBackLeft(game, this, entity, 3),
      new KingBiteBackRight(game, this, entity, 3),
      new KingBiteFontLeft(game, this, entity, 3),
      new KingBiteFrontRight(game, this, entity, 3),

      new KingBiteBackLeft(game, this, entity, 4),
      new KingBiteBackRight(game, this, entity, 4),
      new KingBiteFontLeft(game, this, entity, 4),
      new KingBiteFrontRight(game, this, entity, 4),

      new KingBiteBackLeft(game, this, entity, 5),
      new KingBiteBackRight(game, this, entity, 5),
      new KingBiteFontLeft(game, this, entity, 5),
      new KingBiteFrontRight(game, this, entity, 5),

      new KingBiteBackLeft(game, this, entity, 6),
      new KingBiteBackRight(game, this, entity, 6),
      new KingBiteFontLeft(game, this, entity, 6),
      new KingBiteFrontRight(game, this, entity, 6),

      new KingBiteBackLeft(game, this, entity, 7),
      new KingBiteBackRight(game, this, entity, 7),
      new KingBiteFontLeft(game, this, entity, 7),
      new KingBiteFrontRight(game, this, entity, 7),
    ];
  }
}
