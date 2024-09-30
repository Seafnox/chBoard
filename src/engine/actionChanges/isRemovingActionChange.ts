import { Enumerable } from '../Enumerable';
import { InteractiveEntity } from '../InteractiveEntity';
import { ActionChange } from './ActionChange';
import { ActionChangeType } from './ActionChangeType';
import { RemovingActionChange } from './RemovingActionChange';

export function isRemovingActionChange<
  TCellType extends Enumerable,
  TUnitType extends Enumerable,
  TUnitOwner extends Enumerable,
  TInteractiveEntity extends InteractiveEntity<TCellType, TUnitType, TUnitOwner>
>(change: ActionChange<TCellType, TUnitType, TUnitOwner, TInteractiveEntity>): change is RemovingActionChange<TCellType, TUnitType, TUnitOwner, TInteractiveEntity> {
  return change.type === ActionChangeType.Remove;
}
