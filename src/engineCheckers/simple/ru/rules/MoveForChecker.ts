import { Rule } from '../../../../engine/Rule';
import { Unit } from '../../../../engine/Unit';
import { CheckersCellType } from '../../commons/CheckersCellType';
import { CheckersUnit, CheckersInteractiveEntity, CheckersBoard, CheckersAvailableAction } from '../CheckersRuTypings';
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
    board: CheckersBoard,
  ): CheckersAvailableAction[] {
    return [new SimpleMoveLeft(entity, board), new SimpleMoveRight(entity, board)];
  }
}
