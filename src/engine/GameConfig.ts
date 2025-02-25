import { BoardConfig } from './BoardConfig';
import { Enumerable } from './Enumerable';
import { InteractiveEntity } from './InteractiveEntity';
import { Rule } from './Rule';
import { TurnManagerType } from './TurnManagerFactory';

export interface GameConfig<TCellType extends Enumerable, TUnitType extends Enumerable, TUnitOwner extends Enumerable> extends BoardConfig<TCellType, TUnitType, TUnitOwner> {
  rules: Rule<TCellType, TUnitType, TUnitOwner, InteractiveEntity<TCellType, TUnitType, TUnitOwner>>[];
  turnManagerType: TurnManagerType;
  unitOwners: TUnitOwner[];
}

