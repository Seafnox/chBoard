import { UnitConfig } from 'src/engine/BoardConfig';
import { TurnManagerType } from './TurnManagerType';
import { TwoPlayerUnitOwner } from 'src/engine/twoPlayer/TwoPlayerUnitOwner';
import { CheckersCellType } from '../engineCheckers/simple/commons/CheckersCellType';
import { CheckersUnitType } from '../engineCheckers/simple/commons/CheckersUnitType';

export interface SerializedGameConfig {
  cellMap: Record<string, CheckersCellType>;
  unitMap: Record<string, UnitConfig<CheckersUnitType, TwoPlayerUnitOwner>>;
  width: number;
  height: number;
  ruleTypes: string[];
  turnManagerType: TurnManagerType;
  unitOwners: TwoPlayerUnitOwner[];
}
