import { AvailableAction } from '../../../../engine/AvailableAction';
import { CheckersCellType } from '../../commons/CheckersCellType';
import { CheckersRuUnit } from '../CheckersRuTypings';
import { CheckersUnitOwner } from '../../commons/CheckersUnitOwner';
import { CheckersUnitType } from '../../commons/CheckersUnitType';

export class SimpleMoveLeft extends AvailableAction<CheckersCellType, CheckersUnitType, CheckersUnitOwner, CheckersRuUnit> {
  get priority(): number {
    return 1;
  }

  get isActive(): boolean {
    // FIXME check if unit can move
    return true;
  }

  public action(): void {
    const [x, y] = this.entity.position;
    const nextCell = this.entity.owner === CheckersUnitOwner.Black
      ? this.board.getCell(x - 1, y - 1)
      : this.board.getCell(x - 1, y + 1);

    if (!!nextCell) {
      this.entity.moveTo(nextCell);
    }

    // TODO check can switch to king
  }

}
