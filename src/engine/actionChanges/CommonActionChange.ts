import { Enumerable } from '../Enumerable';
import { InteractiveEntity } from '../InteractiveEntity';
import { AddActionChange } from './AddActionChange';
import { ChangingActionChange } from './ChangingActionChange';
import { EndGameChange } from './EndGameChange';
import { MovingActionChange } from './MovingActionChange';
import { RemovingActionChange } from './RemovingActionChange';
import { SwitchingTurnChange } from './SwitchingTurnChange';

export type CommonActionChange<
  TCellType extends Enumerable,
  TUnitType extends Enumerable,
  TUnitOwner extends Enumerable,
  TInteractiveEntity extends InteractiveEntity<TCellType, TUnitType, TUnitOwner>
> =
  | MovingActionChange<TCellType, TUnitType, TUnitOwner, TInteractiveEntity>
  | AddActionChange<TCellType, TUnitType, TUnitOwner, TInteractiveEntity>
  | RemovingActionChange<TCellType, TUnitType, TUnitOwner, TInteractiveEntity>
  | ChangingActionChange<TCellType, TUnitType, TUnitOwner, TInteractiveEntity>
  | SwitchingTurnChange<TCellType, TUnitType, TUnitOwner, TInteractiveEntity>
  | EndGameChange<TCellType, TUnitType, TUnitOwner, TInteractiveEntity>;
