import { ActionChange } from './ActionChange';
import { ActionChangeType } from './ActionChangeType';

export interface RemovingActionChange<TInteractiveEntity> extends ActionChange<TInteractiveEntity> {
  type: ActionChangeType.Remove;
  target: TInteractiveEntity;
}
