import { ActionChange } from './ActionChange';
import { ActionChangeType } from './ActionChangeType';

export interface AddActionChange<TInteractiveEntity> extends ActionChange<TInteractiveEntity> {
  type: ActionChangeType.Add;
  target: TInteractiveEntity;
  to: number[];
}
