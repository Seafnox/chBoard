import { Vector2d } from '../../../../engine/Vector2d';
import { TwoPlayerUnitOwner } from '../../../../engine/twoPlayer/TwoPlayerUnitOwner';
import { CheckerAbstractBite } from './CheckerAbstractBite';

export class CheckerBiteFrontLeft extends CheckerAbstractBite {
  public get biteDirection() {
    return this.entity.owner === TwoPlayerUnitOwner.Black
      ? Vector2d.Down.add(Vector2d.Left)
      : Vector2d.Up.add(Vector2d.Left);
  }
}
