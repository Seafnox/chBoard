import { ActionChange } from './ActionChange';
import { ActionChangeType } from './ActionChangeType';
import { MovingActionChange } from './MovingActionChange';

export function isMovingActonChange(change: ActionChange): change is MovingActionChange {
  return change.type === ActionChangeType.Move;
}
