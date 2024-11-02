import { ActionChange } from './ActionChange';
import { ActionChangeType } from './ActionChangeType';
import { ChangingActionChange } from './ChangingActionChange';

export function isChangingActionChange(change: ActionChange): change is ChangingActionChange {
  return change.type === ActionChangeType.Change;
}
