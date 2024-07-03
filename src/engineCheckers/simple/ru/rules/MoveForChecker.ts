import { Rule } from '../../../../engine/Rule';
import { Unit } from '../../../../engine/Unit';
import { CheckersCellType } from '../../commons/CheckersCellType';
import { CheckersRuUnit, CheckersRuInteractiveEntity, CheckersRuBoard, CheckersRuAvailableAction } from '../CheckersRuTypings';
import { CheckersUnitOwner } from '../../commons/CheckersUnitOwner';
import { CheckersUnitType } from '../../commons/CheckersUnitType';
import { SimpleMoveLeft } from '../actions/SimpleMoveLeft';
import { SimpleMoveRight } from '../actions/SimpleMoveRight';



export class MoveForChecker extends Rule<CheckersCellType, CheckersUnitType, CheckersUnitOwner, CheckersRuUnit> {
  isSuitable(entity: CheckersRuInteractiveEntity): entity is CheckersRuUnit {
    return entity instanceof Unit && entity.type === CheckersUnitType.Checker;
  }

  getAction(
    entity: CheckersRuUnit,
    board: CheckersRuBoard,
  ): CheckersRuAvailableAction[] {
    return [new SimpleMoveLeft(entity, board), new SimpleMoveRight(entity, board)];
  }
}
