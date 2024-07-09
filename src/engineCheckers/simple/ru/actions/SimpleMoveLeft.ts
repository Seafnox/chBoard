import { Action } from '../../../../engine/Action';
import { ActionChange } from '../../../../engine/actionChanges/ActionChange';
import { CheckersCellType } from '../../commons/CheckersCellType';
import { CheckersUnit } from '../CheckersRuTypings';
import { CheckersUnitOwner } from '../../commons/CheckersUnitOwner';
import { CheckersUnitType } from '../../commons/CheckersUnitType';

export class SimpleMoveLeft extends Action<CheckersCellType, CheckersUnitType, CheckersUnitOwner, CheckersUnit> {
  get priority(): number {
    return 1;
  }

  get isActive(): boolean {
    // FIXME check if unit can move
    return true;
  }

  get changes(): ActionChange<CheckersUnit>[] {
    // FIXME add move change
    return [];
  }

  public run(): void {
    const [x, y] = this.entity.position;
    const nextCell = this.entity.owner === CheckersUnitOwner.Black
      ? this.board.getCell(x - 1, y - 1)
      : this.board.getCell(x - 1, y + 1);

    if (nextCell) {
      this.entity.moveTo(nextCell);
    }

    // TODO check can switch to king
  }

}
