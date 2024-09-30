import { Enumerable } from '../Enumerable';
import { InteractiveEntity } from '../InteractiveEntity';
import { ActionChange } from './ActionChange';
import { ActionChangeType } from './ActionChangeType';
import { ChangingActionChange } from './ChangingActionChange';

export function isChangingActionChange<
  TCellType extends Enumerable,
  TUnitType extends Enumerable,
  TUnitOwner extends Enumerable,
  TInteractiveEntity extends InteractiveEntity<TCellType, TUnitType, TUnitOwner>
>(change: ActionChange<TCellType, TUnitType, TUnitOwner, TInteractiveEntity>): change is ChangingActionChange<TCellType, TUnitType, TUnitOwner, TInteractiveEntity> {
  return change.type === ActionChangeType.Change;
}
