import { Vector2d } from '../Vector2d';
import { ActionChange } from './ActionChange';
import { ActionChangeType } from './ActionChangeType';

export interface AddActionChange<TInteractiveEntity> extends ActionChange<TInteractiveEntity> {
  type: ActionChangeType.Add;
  target: TInteractiveEntity;
  to: Vector2d;
}
