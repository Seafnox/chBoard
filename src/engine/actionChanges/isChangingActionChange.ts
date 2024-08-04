import { ActionChange } from './ActionChange';
import { ActionChangeType } from './ActionChangeType';
import { ChangingActionChange } from './ChangingActionChange';

export function isChangingActionChange<TInteractiveEntity>(change: ActionChange<TInteractiveEntity>): change is ChangingActionChange<TInteractiveEntity> {
  return change.type === ActionChangeType.Change;
}
