import { Vector2d } from '../../../../engine/Vector2d';
import { CheckersUnitOwner } from '../../commons/CheckersUnitOwner';
import { CheckersAbstractBite } from './CheckersAbstractBite';

export class CheckerBiteBackRight extends CheckersAbstractBite {
  protected get biteDirection() {
    return this.entity.owner === CheckersUnitOwner.Black
      ? Vector2d.Up.add(Vector2d.Right)
      : Vector2d.Down.add(Vector2d.Right);
  }
}
