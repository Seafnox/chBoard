import { Action } from '../engine/Action';
import { Enumerable } from '../engine/Enumerable';
import { InteractiveEntity } from '../engine/InteractiveEntity';

export interface PlayerGameClient<TCellType extends Enumerable, TUnitType extends Enumerable, TUnitOwner extends Enumerable> {
  onActionChange: (actions: Action<TCellType, TUnitType, TUnitOwner, InteractiveEntity<TCellType, TUnitType, TUnitOwner>>[]) => void;
}
