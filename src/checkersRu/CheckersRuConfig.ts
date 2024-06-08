import { BoardConfig } from '../engine/BoardConfig';
import { CheckersRuCellType } from './CheckersRuCellType';
import { CheckersRuUnitType } from './CheckersRuUnitType';

const cellMap: Record<string, CheckersRuCellType> = {};

for(let i = 0; i < 8; i++) {
  for(let j = 0; j < 8; j++) {
    cellMap[`${i},${j}`] = CheckersRuCellType.Simple;
  }
}

const unitMap: Record<string, CheckersRuUnitType> = {}

// FIXME wrong unit generation
for(let i = 0; i < 8; i++) {
  unitMap[`${i},0`] = CheckersRuUnitType.Checker;
  unitMap[`${i},7`] = CheckersRuUnitType.Checker;
}

export const checkersRuConfig: BoardConfig<CheckersRuCellType, CheckersRuUnitType> = {
  cellMap,
  unitMap,
}
