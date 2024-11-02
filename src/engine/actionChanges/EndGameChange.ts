import { ActionChange } from './ActionChange';
import { ActionChangeType } from './ActionChangeType';

export interface EndGameChange extends ActionChange {
  type: ActionChangeType.EndGame;
  winner: string;
}
