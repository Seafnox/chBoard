import { AvailableAction } from '../../engine/AvailableAction';
import { Board } from '../../engine/Board';
import { InteractiveEntity } from '../../engine/InteractiveEntity';
import { Rule } from '../../engine/Rule';
import { Unit } from '../../engine/Unit';
import { CheckersRuCellType } from '../CheckersRuCellType';
import { CheckersRuUnitType } from '../CheckersRuUnitType';
import { SimpleMoveLeft } from './SimpleMoveLeft';
import { SimpleMoveRight } from './SimpleMoveRight';

export class MoveForChecker extends Rule<CheckersRuCellType, CheckersRuUnitType, Unit<CheckersRuCellType, CheckersRuUnitType>> {
  isSuitable(entity: InteractiveEntity<CheckersRuCellType, CheckersRuUnitType>): entity is Unit<CheckersRuCellType, CheckersRuUnitType> {
    return entity instanceof Unit && entity.type === CheckersRuUnitType.Checker;
  }

  getAction(
    entity: Unit<CheckersRuCellType, CheckersRuUnitType>,
    board: Board<CheckersRuCellType, CheckersRuUnitType>,
  ): AvailableAction<CheckersRuCellType, CheckersRuUnitType, Unit<CheckersRuCellType, CheckersRuUnitType>>[] {
    return [new SimpleMoveLeft(entity, board), new SimpleMoveRight(entity, board)];
  }
}
