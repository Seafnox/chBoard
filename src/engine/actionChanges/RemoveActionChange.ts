import { ActionChange } from './ActionChange';
import { ActionChangeType } from './ActionChangeType';

export interface RemoveActionChange<TInteractiveEntity> extends ActionChange<TInteractiveEntity> {
  type: ActionChangeType.Remove;
  target: TInteractiveEntity;
}
