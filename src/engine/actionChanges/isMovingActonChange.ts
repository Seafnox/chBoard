import { ActionChange } from './ActionChange';
import { ActionChangeType } from './ActionChangeType';
import { MovingActionChange } from './MovingActionChange';

export function isMovingActonChange<TInteractiveEntity>(change: ActionChange<TInteractiveEntity>): change is MovingActionChange<TInteractiveEntity> {
  return change.type === ActionChangeType.Move;
}
