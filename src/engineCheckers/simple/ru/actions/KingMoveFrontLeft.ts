import { Vector2d } from '../../../../engine/Vector2d';
import { CheckersUnitOwner } from '../../commons/CheckersUnitOwner';
import { KingAbstractMove } from './KingAbstractMove';

export class KingMoveFrontLeft extends KingAbstractMove {
  protected get moveDirection() {
    return this.entity.owner === CheckersUnitOwner.Black
      ? Vector2d.Down.add(Vector2d.Left)
      : Vector2d.Up.add(Vector2d.Left);
  }
}
