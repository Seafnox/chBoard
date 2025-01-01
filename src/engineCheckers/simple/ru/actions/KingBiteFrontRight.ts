import { Vector2d } from '../../../../engine/Vector2d';
import { TwoPlayerUnitOwner } from '../../../../engine/twoPlayer/TwoPlayerUnitOwner';
import { KingAbstractBite } from './KingAbstractBite';

export class KingBiteFrontRight extends KingAbstractBite {
  public get biteDirection() {
    return this.entity.owner === TwoPlayerUnitOwner.Black
      ? Vector2d.Down.add(Vector2d.Right)
      : Vector2d.Up.add(Vector2d.Right);
  }
}
