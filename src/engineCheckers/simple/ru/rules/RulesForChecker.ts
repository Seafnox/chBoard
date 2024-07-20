import { EventEmitter } from '../../../../engine/EventEmitter';
import { Unit } from '../../../../engine/Unit';
import { CheckersRule } from '../../commons/CheckersRule';
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
    eventBus: EventEmitter,
  ): CheckersAvailableAction[] {
    return [
      // TODO make commons move logic
      new CheckerMoveFrontLeft(entity, game, eventBus),
      new CheckerMoveFrontRight(entity, game, eventBus),
      new CheckerBiteFrontLeft(entity, game, eventBus),
      new CheckerBiteFrontRight(entity, game, eventBus),
      new CheckerBiteBackLeft(entity, game, eventBus),
      new CheckerBiteBackRight(entity, game, eventBus),
    ];
  }
}
