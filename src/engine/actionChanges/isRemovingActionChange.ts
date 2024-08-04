import { ActionChange } from './ActionChange';
import { ActionChangeType } from './ActionChangeType';
import { RemovingActionChange } from './RemovingActionChange';

export function isRemovingActionChange<TInteractiveEntity>(change: ActionChange<TInteractiveEntity>): change is RemovingActionChange<TInteractiveEntity> {
  return change.type === ActionChangeType.Remove;
}
