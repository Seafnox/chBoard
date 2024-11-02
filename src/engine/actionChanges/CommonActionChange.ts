import { AddActionChange } from './AddActionChange';
import { ChangingActionChange } from './ChangingActionChange';
import { EndGameChange } from './EndGameChange';
import { MovingActionChange } from './MovingActionChange';
import { RemovingActionChange } from './RemovingActionChange';
import { SwitchingTurnChange } from './SwitchingTurnChange';

export type CommonActionChange =
  | MovingActionChange
  | AddActionChange
  | RemovingActionChange
  | ChangingActionChange
  | SwitchingTurnChange
  | EndGameChange;
