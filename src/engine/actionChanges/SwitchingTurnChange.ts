import { ActionChange } from './ActionChange';
import { ActionChangeType } from './ActionChangeType';

export interface SwitchingTurnChange extends ActionChange {
  type: ActionChangeType.SwitchTurn;
}
