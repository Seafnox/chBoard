import { ActionChange } from './ActionChange';
import { ActionChangeType } from './ActionChangeType';

export interface CompleteTurnChange<TInteractiveEntity> extends ActionChange<TInteractiveEntity> {
  type: ActionChangeType.CompleteTurn;
}
