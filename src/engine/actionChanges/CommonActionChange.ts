import { AddActionChange } from './AddActionChange';
import { ChangingActionChange } from './ChangingActionChange';
import { MovingActionChange } from './MovingActionChange';
import { RemovingActionChange } from './RemovingActionChange';
import { SwitchingTurnChange } from './SwitchingTurnChange';

export type CommonActionChange<TInteractiveEntity> =
  | MovingActionChange<TInteractiveEntity>
  | AddActionChange<TInteractiveEntity>
  | RemovingActionChange<TInteractiveEntity>
  | ChangingActionChange<TInteractiveEntity>
  | SwitchingTurnChange<TInteractiveEntity>;
