import { ActionChange } from './ActionChange';
import { ActionChangeType } from './ActionChangeType';
import { SwitchingTurnChange } from './SwitchingTurnChange';

export function isSwitchingTurnChange<TInteractiveEntity>(change: ActionChange<TInteractiveEntity>): change is SwitchingTurnChange<TInteractiveEntity> {
  return change.type === ActionChangeType.SwitchTurn;
}
