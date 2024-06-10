import { AvailableAction } from '../../engine/AvailableAction';
import { CheckersRuCellType } from '../CheckersRuCellType';
import { CheckersRuUnit } from '../CheckersRuTypings';
import { CheckersRuUnitOwner } from '../CheckersRuUnitOwner';
import { CheckersRuUnitType } from '../CheckersRuUnitType';

export class SimpleMoveLeft extends AvailableAction<CheckersRuCellType, CheckersRuUnitType, CheckersRuUnitOwner, CheckersRuUnit> {
  get priority(): number {
    return 1;
  }

  get isActive(): boolean {
    // FIXME check if unit can move
    return true;
  }

  public action(): void {
    const [x, y] = this.entity.position;
    if (this.entity.owner === CheckersRuUnitOwner.Black) {
      this.entity.changePosition(x - 1, y - 1);
    } else {
      this.entity.changePosition(x - 1, y + 1);
    }

    // TODO check can switch to king
  }

}
