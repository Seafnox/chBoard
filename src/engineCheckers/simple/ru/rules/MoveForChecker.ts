import { EventEmitter } from '../../../../engine/EventEmitter';
import { Rule } from '../../../../engine/Rule';
import { Unit } from '../../../../engine/Unit';
import { CheckersCellType } from '../../commons/CheckersCellType';
import { CheckersUnit, CheckersInteractiveEntity, CheckersAvailableAction, CheckersGame } from '../CheckersRuTypings';
import { CheckersUnitOwner } from '../../commons/CheckersUnitOwner';
import { CheckersUnitType } from '../../commons/CheckersUnitType';
import { SimpleMoveLeft } from '../actions/SimpleMoveLeft';
import { SimpleMoveRight } from '../actions/SimpleMoveRight';



export class MoveForChecker extends Rule<CheckersCellType, CheckersUnitType, CheckersUnitOwner, CheckersUnit> {
  isSuitable(entity: CheckersInteractiveEntity): entity is CheckersUnit {
    return entity instanceof Unit && entity.type === CheckersUnitType.Checker;
  }

  getAction(
    entity: CheckersUnit,
    game: CheckersGame,
    eventBus: EventEmitter,
  ): CheckersAvailableAction[] {
    return [new SimpleMoveLeft(entity, game, eventBus), new SimpleMoveRight(entity, game, eventBus)];
  }
}
