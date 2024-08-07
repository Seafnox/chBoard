import { BoardConfig } from './BoardConfig';
import { Enumerable } from './Enumerable';
import { InteractiveEntity } from './InteractiveEntity';
import { Rule } from './Rule';
import { TurnManagerConstructor } from './TurnManager';

export interface GameConfig<TCellType, TUnitType, TUnitOwner extends Enumerable> extends BoardConfig<TCellType, TUnitType, TUnitOwner> {
  rules: Rule<TCellType, TUnitType, TUnitOwner, InteractiveEntity<TCellType, TUnitType, TUnitOwner>>[];
  turnManager: TurnManagerConstructor<TCellType, TUnitType, TUnitOwner>;
}
