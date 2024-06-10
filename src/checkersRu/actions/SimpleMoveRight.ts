import { AvailableAction } from '../../engine/AvailableAction';
import { CheckersRuCellType } from '../CheckersRuCellType';
import { CheckersRuUnit } from '../CheckersRuTypings';
import { CheckersRuUnitOwner } from '../CheckersRuUnitOwner';
import { CheckersRuUnitType } from '../CheckersRuUnitType';

export class SimpleMoveRight extends AvailableAction<CheckersRuCellType, CheckersRuUnitType, CheckersRuUnitOwner, CheckersRuUnit> {
  get priority(): number {
    return 1;
  }

  get isActive(): boolean {
    // FIXME check if unit can move
    return true;
  }

  public action(): void {
    const [x, y] = this.entity.position;
    const nextCell = this.entity.owner === CheckersRuUnitOwner.Black
      ? this.board.getCell(x + 1, y - 1)
      : this.board.getCell(x + 1, y + 1);

    if (!!nextCell) {
      this.entity.moveTo(nextCell);
    }

    // TODO check can switch to king
  }

}
