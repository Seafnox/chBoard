import { ActionChange } from './ActionChange';
import { ActionChangeType } from './ActionChangeType';
import { RemovingActionChange } from './RemovingActionChange';

export function isRemovingActionChange(change: ActionChange): change is RemovingActionChange {
  return change.type === ActionChangeType.Remove;
}
