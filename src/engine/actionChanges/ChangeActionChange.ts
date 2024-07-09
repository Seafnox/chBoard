import { ActionChange } from './ActionChange';
import { ActionChangeType } from './ActionChangeType';

export interface ChangeActionChange<TInteractiveEntity> extends ActionChange<TInteractiveEntity> {
  type: ActionChangeType.Change;
  target: TInteractiveEntity;
  update: () => void;
}
