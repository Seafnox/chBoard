import { Vector2d } from '../../../../engine/Vector2d';
import { CheckersUnitOwner } from '../../commons/CheckersUnitOwner';
import { CheckerAbstractMove } from './CheckerAbstractMove';

export class CheckerMoveFrontRight extends CheckerAbstractMove {
  protected get moveDirection() {
    return this.entity.owner === CheckersUnitOwner.Black
      ? Vector2d.Down.add(Vector2d.Right)
      : Vector2d.Up.add(Vector2d.Right);
  }
}
