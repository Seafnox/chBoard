import { Enumerable } from '../Enumerable';
import { InteractiveEntity } from '../InteractiveEntity';
import { ActionChange } from './ActionChange';
import { ActionChangeType } from './ActionChangeType';

export interface ChangingActionChange<
  TCellType extends Enumerable,
  TUnitType extends Enumerable,
  TUnitOwner extends Enumerable,
  TInteractiveEntity extends InteractiveEntity<TCellType, TUnitType, TUnitOwner>
> extends ActionChange<TCellType, TUnitType, TUnitOwner, TInteractiveEntity> {
  type: ActionChangeType.Change;
  target: TInteractiveEntity;
  update: (target: TInteractiveEntity) => void;
}
