import { ActionChange } from './ActionChange';
import { ActionChangeType } from './ActionChangeType';

export interface SwitchingTurnChange<TInteractiveEntity> extends ActionChange<TInteractiveEntity> {
  type: ActionChangeType.SwitchTurn;
}
