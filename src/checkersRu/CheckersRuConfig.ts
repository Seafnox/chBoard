import { UnitConfig } from '../engine/BoardConfig';
import { GameConfig } from '../engine/GameConfig';
import { CheckersRuCellType } from './CheckersRuCellType';
import { CheckersRuUnitOwner } from './CheckersRuUnitOwner';
import { CheckersRuUnitType } from './CheckersRuUnitType';
import { MoveForChecker } from './rules/MoveForChecker';

const cellMap: Record<string, CheckersRuCellType> = {};

for(let i = 0; i < 8; i++) {
  for(let j = 0; j < 8; j++) {
    cellMap[`${i},${j}`] = CheckersRuCellType.Simple;
  }
}

const unitMap: Record<string, UnitConfig<CheckersRuUnitType, CheckersRuUnitOwner>> = {}

// FIXME wrong unit generation
for(let i = 0; i < 8; i++) {
  unitMap[`${i},0`] = {
    type: CheckersRuUnitType.Checker,
    owner: CheckersRuUnitOwner.White,
  };
  unitMap[`${i},7`] = {
    type: CheckersRuUnitType.Checker,
    owner: CheckersRuUnitOwner.Black,
  };
}

export const checkersRuConfig: GameConfig<CheckersRuCellType, CheckersRuUnitType, CheckersRuUnitOwner> = {
  cellMap,
  unitMap,
  width: 8,
  height: 8,
  rules: [
    new MoveForChecker(),
  ],
}
