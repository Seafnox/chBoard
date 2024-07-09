import { UnitConfig } from '../../../engine/BoardConfig';
import { GameConfig } from '../../../engine/GameConfig';
import { CheckersCellType } from '../commons/CheckersCellType';
import { CheckersTurnManager } from '../commons/CheckersTurnManager';
import { CheckersUnitOwner } from '../commons/CheckersUnitOwner';
import { CheckersUnitType } from '../commons/CheckersUnitType';
import { RulesForChecker } from './rules/RulesForChecker';

const cellMap: Record<string, CheckersCellType> = {};

for(let x = 0; x < 8; x++) {
  for(let y = 0; y < 8; y++) {
    cellMap[`${x},${y}`] = CheckersCellType.Simple;
  }
}

const unitMap: Record<string, UnitConfig<CheckersUnitType, CheckersUnitOwner>> = {}

for(let x = 0; x < 8; x++) {
  for(let y = 0; y < 3; y++) {
    if ((x + y) % 2 === 0) continue;

    unitMap[`${x},${y}`] = {
      type: CheckersUnitType.Checker,
      owner: CheckersUnitOwner.Black,
    };
  }
}
for(let x = 0; x < 8; x++) {
  for(let y = 0; y < 3; y++) {
    if ((x + 7 - y) % 2 === 0) continue;

    unitMap[`${x},${7-y}`] = {
      type: CheckersUnitType.Checker,
      owner: CheckersUnitOwner.White,
    };
  }
}


export const checkersRuConfig: GameConfig<CheckersCellType, CheckersUnitType, CheckersUnitOwner> = {
  cellMap,
  unitMap,
  width: 8,
  height: 8,
  rules: [
    new RulesForChecker(),
  ],
  turnManager: CheckersTurnManager,
}
