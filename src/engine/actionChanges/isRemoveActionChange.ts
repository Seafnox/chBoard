import { ActionChange } from './ActionChange';
import { ActionChangeType } from './ActionChangeType';
import { RemoveActionChange } from './RemoveActionChange';

export function isRemoveActionChange<TInteractiveEntity>(change: ActionChange<TInteractiveEntity>): change is RemoveActionChange<TInteractiveEntity> {
  return change.type === ActionChangeType.Remove;
}
