import { Vector2d } from '../../../../engine/Vector2d';
import { TwoPlayerUnitOwner } from '../../../../engine/twoPlayer/TwoPlayerUnitOwner';
import { CheckerAbstractMove } from './CheckerAbstractMove';

export class CheckerMoveFrontLeft extends CheckerAbstractMove {
  protected get moveDirection() {
    return this.entity.owner === TwoPlayerUnitOwner.Black
      ? Vector2d.Down.add(Vector2d.Left)
      : Vector2d.Up.add(Vector2d.Left);
  }
}
