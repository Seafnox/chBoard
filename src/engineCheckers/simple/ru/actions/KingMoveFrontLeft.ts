import { TwoPlayerUnitOwner } from '../../../../engine/twoPlayer/TwoPlayerUnitOwner';
import { Vector2d } from '../../../../engine/Vector2d';
import { KingAbstractMove } from './KingAbstractMove';

export class KingMoveFrontLeft extends KingAbstractMove {
  protected get moveDirection() {
    return this.entity.owner === TwoPlayerUnitOwner.Black
      ? Vector2d.Down.add(Vector2d.Left)
      : Vector2d.Up.add(Vector2d.Left);
  }
}
