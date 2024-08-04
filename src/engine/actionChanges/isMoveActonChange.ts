import { ActionChange } from './ActionChange';
import { ActionChangeType } from './ActionChangeType';
import { MoveActionChange } from './MoveActionChange';

export function isMoveActonChange<TInteractiveEntity>(change: ActionChange<TInteractiveEntity>): change is MoveActionChange<TInteractiveEntity> {
  return change.type === ActionChangeType.Move;
}
