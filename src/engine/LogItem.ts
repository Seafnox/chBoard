import { ActionChangeType } from './actionChanges/ActionChangeType';
import { Enumerable } from './Enumerable';
import { InteractiveEntity } from './InteractiveEntity';

export interface LogItem<TCellType extends Enumerable, TUnitType extends Enumerable, TUnitOwner extends Enumerable> {
  type: ActionChangeType;
  entity: InteractiveEntity<TCellType, TUnitType, TUnitOwner>;
  reason: InteractiveEntity<TCellType, TUnitType, TUnitOwner>;
  message?: string;
}
