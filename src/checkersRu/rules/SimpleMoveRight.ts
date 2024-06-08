import { AvailableAction } from '../../engine/AvailableAction';
import { Unit } from '../../engine/Unit';
import { CheckersRuCellType } from '../CheckersRuCellType';
import { CheckersRuUnitType } from '../CheckersRuUnitType';

export class SimpleMoveRight extends AvailableAction<CheckersRuCellType, CheckersRuUnitType, Unit<CheckersRuCellType, CheckersRuUnitType>> {
  get priority(): number {
    return 1;
  }

  get isActive(): boolean {
    // FIXME check if unit can move
    return true;
  }

  public action(): void {
    const [x, y] = this.entity.position;
    this.entity.changePosition(x + 1, y + 1);

    // TODO check can switch to king
  }

}
