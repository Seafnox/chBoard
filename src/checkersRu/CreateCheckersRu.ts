import { Game } from '../engine/Game';
import { CheckersRuCellType } from './CheckersRuCellType';
import { checkersRuConfig } from './CheckersRuConfig';
import { CheckersRuUnitType } from './CheckersRuUnitType';
import { MoveForChecker } from './rules/MoveForChecker';

export function createCheckersRu(): Game<CheckersRuCellType, CheckersRuUnitType> {
  return new Game(
    8,
    8,
    checkersRuConfig,
    [
      new MoveForChecker(),
    ]
  )
}
