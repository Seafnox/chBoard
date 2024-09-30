import { Enumerable } from '../Enumerable';
import { InteractiveEntity } from '../InteractiveEntity';
import { Vector2d } from '../Vector2d';
import { ActionChange } from './ActionChange';
import { ActionChangeType } from './ActionChangeType';

export interface AddActionChange<
  TCellType extends Enumerable,
  TUnitType extends Enumerable,
  TUnitOwner extends Enumerable,
  TInteractiveEntity extends InteractiveEntity<TCellType, TUnitType, TUnitOwner>
> extends ActionChange<TCellType, TUnitType, TUnitOwner, TInteractiveEntity> {
  type: ActionChangeType.Add;
  target: TInteractiveEntity;
  to: Vector2d;
}
