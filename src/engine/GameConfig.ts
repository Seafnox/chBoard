import { BoardConfig } from './BoardConfig';
import { InteractiveEntity } from './InteractiveEntity';
import { Rule } from './Rule';

export interface GameConfig<CellType, UnitType, UnitOwner> extends BoardConfig<CellType, UnitType, UnitOwner> {
  rules: Rule<CellType, UnitType, UnitOwner, InteractiveEntity<CellType, UnitType, UnitOwner>>[],
}
