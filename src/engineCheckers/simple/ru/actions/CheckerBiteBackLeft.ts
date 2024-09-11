import { Vector2d } from '../../../../engine/Vector2d';
import { CheckersUnitOwner } from '../../commons/CheckersUnitOwner';
import { CheckerAbstractBite } from './CheckerAbstractBite';

export class CheckerBiteBackLeft extends CheckerAbstractBite {
  public get biteDirection() {
    return this.entity.owner === CheckersUnitOwner.Black
      ? Vector2d.Up.add(Vector2d.Left)
      : Vector2d.Down.add(Vector2d.Left);
  }
}
