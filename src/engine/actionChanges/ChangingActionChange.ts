import { ActionChange } from './ActionChange';
import { ActionChangeType } from './ActionChangeType';

export interface ChangingActionChange<TInteractiveEntity> extends ActionChange<TInteractiveEntity> {
  type: ActionChangeType.Change;
  target: TInteractiveEntity;
  update: (target: TInteractiveEntity) => void;
}
