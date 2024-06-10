import { Rule } from '../../engine/Rule';
import { Unit } from '../../engine/Unit';
import { CheckersRuCellType } from '../CheckersRuCellType';
import { CheckersRuUnit, CheckersRuInteractiveEntity, CheckersRuBoard, CheckersRuAvailableAction } from '../CheckersRuTypings';
import { CheckersRuUnitOwner } from '../CheckersRuUnitOwner';
import { CheckersRuUnitType } from '../CheckersRuUnitType';
import { SimpleMoveLeft } from './SimpleMoveLeft';
import { SimpleMoveRight } from './SimpleMoveRight';



export class MoveForChecker extends Rule<CheckersRuCellType, CheckersRuUnitType, CheckersRuUnitOwner, CheckersRuUnit> {
  isSuitable(entity: CheckersRuInteractiveEntity): entity is CheckersRuUnit {
    return entity instanceof Unit && entity.type === CheckersRuUnitType.Checker;
  }

  getAction(
    entity: CheckersRuUnit,
    board: CheckersRuBoard,
  ): CheckersRuAvailableAction[] {
    return [new SimpleMoveLeft(entity, board), new SimpleMoveRight(entity, board)];
  }
}
