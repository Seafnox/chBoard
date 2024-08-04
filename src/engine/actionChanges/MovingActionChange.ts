import { Vector2d } from '../Vector2d';
import { ActionChange } from './ActionChange';
import { ActionChangeType } from './ActionChangeType';

export interface MovingActionChange<TInteractiveEntity> extends ActionChange<TInteractiveEntity> {
  type: ActionChangeType.Move;
  to: Vector2d;
}
