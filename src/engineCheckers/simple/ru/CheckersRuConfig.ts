import { UnitConfig } from '../../../engine/BoardConfig';
import { GameConfig } from '../../../engine/GameConfig';
import { CheckersCellType } from '../commons/CheckersCellType';
import { CheckersTurnManager } from '../commons/CheckersTurnManager';
import { CheckersUnitOwner } from '../commons/CheckersUnitOwner';
import { CheckersUnitType } from '../commons/CheckersUnitType';
import { MoveForChecker } from './rules/MoveForChecker';

const cellMap: Record<string, CheckersCellType> = {};

for(let i = 0; i < 8; i++) {
  for(let j = 0; j < 8; j++) {
    cellMap[`${i},${j}`] = CheckersCellType.Simple;
  }
}

const unitMap: Record<string, UnitConfig<CheckersUnitType, CheckersUnitOwner>> = {}

// FIXME wrong unit generation
for(let i = 0; i < 8; i++) {
  unitMap[`${i},0`] = {
    type: CheckersUnitType.Checker,
    owner: CheckersUnitOwner.White,
  };
  unitMap[`${i},7`] = {
    type: CheckersUnitType.Checker,
    owner: CheckersUnitOwner.Black,
  };
}

export const checkersRuConfig: GameConfig<CheckersCellType, CheckersUnitType, CheckersUnitOwner> = {
  cellMap,
  unitMap,
  width: 8,
  height: 8,
  rules: [
    new MoveForChecker(),
  ],
  turnManager: CheckersTurnManager,
}
