import { AddActionChange } from './AddActionChange';
import { ChangeActionChange } from './ChangeActionChange';
import { MoveActionChange } from './MoveActionChange';
import { RemoveActionChange } from './RemoveActionChange';

export type CommonActionChange<TInteractiveEntity> =
  | MoveActionChange<TInteractiveEntity>
  | AddActionChange<TInteractiveEntity>
  | RemoveActionChange<TInteractiveEntity>
  | ChangeActionChange<TInteractiveEntity>;
