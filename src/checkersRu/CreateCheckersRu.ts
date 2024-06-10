import { Game } from '../engine/Game';
import { CheckersRuCellType } from './CheckersRuCellType';
import { checkersRuConfig } from './CheckersRuConfig';
import { CheckersRuUnitOwner } from './CheckersRuUnitOwner';
import { CheckersRuUnitType } from './CheckersRuUnitType';
import { MoveForChecker } from './rules/MoveForChecker';

export function createCheckersRu(): Game<CheckersRuCellType, CheckersRuUnitType, CheckersRuUnitOwner> {
  return new Game(
    8,
    8,
    checkersRuConfig,
    [
      new MoveForChecker(),
    ]
  )
}
