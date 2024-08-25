import { Vector2d } from '../../../../engine/Vector2d';
import { CheckersUnitOwner } from '../../commons/CheckersUnitOwner';
import { KingAbstractBite } from './KingAbstractBite';

export class KingBiteBackRight extends KingAbstractBite {
  protected get biteDirection() {
    return this.entity.owner === CheckersUnitOwner.Black
      ? Vector2d.Up.add(Vector2d.Right)
      : Vector2d.Down.add(Vector2d.Right);
  }
}
