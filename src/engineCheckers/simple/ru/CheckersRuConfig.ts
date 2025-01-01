import { UnitConfig } from '../../../engine/BoardConfig';
import { GameConfig } from '../../../engine/GameConfig';
import { TwoPlayerTurnManager } from '../../../engine/twoPlayer/TwoPlayerTurnManager';
import { TwoPlayerUnitOwner } from '../../../engine/twoPlayer/TwoPlayerUnitOwner';
import { CheckersCellType } from '../commons/CheckersCellType';
import { CheckersUnitType } from '../commons/CheckersUnitType';
import { BiteRulesForChecker } from './rules/BiteRulesForChecker';
import { BiteRulesForKing } from './rules/BiteRulesForKing';
import { MoveRulesForChecker } from './rules/MoveRulesForChecker';
import { MoveRulesForKing } from './rules/MoveRulesForKing';

const cellMap: Record<string, CheckersCellType> = {};

for(let x = 0; x < 8; x++) {
  for(let y = 0; y < 8; y++) {
    cellMap[`${x},${y}`] = CheckersCellType.Simple;
  }
}

const unitMap: Record<string, UnitConfig<CheckersUnitType, TwoPlayerUnitOwner>> = {}

for(let x = 0; x < 8; x++) {
  for(let y = 0; y < 3; y++) {
    if ((x + y) % 2 === 0) continue;

    unitMap[`${x},${y}`] = {
      type: CheckersUnitType.King,
      owner: TwoPlayerUnitOwner.Black,
    };
  }
}
for(let x = 0; x < 8; x++) {
  for(let y = 0; y < 3; y++) {
    if ((x + 7 - y) % 2 === 0) continue;

    unitMap[`${x},${7-y}`] = {
      type: CheckersUnitType.Checker,
      owner: TwoPlayerUnitOwner.White,
    };
  }
}


export const checkersRuConfig: GameConfig<CheckersCellType, CheckersUnitType, TwoPlayerUnitOwner> = {
  cellMap,
  unitMap,
  width: 8,
  height: 8,
  rules: [
    new MoveRulesForChecker(),
    new BiteRulesForChecker(),
    new MoveRulesForKing(),
    new BiteRulesForKing(),
  ],
  turnManager: TwoPlayerTurnManager<CheckersCellType, CheckersUnitType>,
}
