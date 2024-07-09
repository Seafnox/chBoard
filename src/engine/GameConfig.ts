import { BoardConfig } from './BoardConfig';
import { InteractiveEntity } from './InteractiveEntity';
import { Rule } from './Rule';
import { TurnManagerConstructor, TurnManager } from './TurnManager';

export interface GameConfig<TCellType, TUnitType, TUnitOwner> extends BoardConfig<TCellType, TUnitType, TUnitOwner> {
  rules: Rule<TCellType, TUnitType, TUnitOwner, InteractiveEntity<TCellType, TUnitType, TUnitOwner>>[];
  turnManager: TurnManagerConstructor<TCellType, TUnitType, TUnitOwner, TurnManager<TCellType, TUnitType, TUnitOwner>>;
}
