import { Game } from '../engine/Game';
import { CheckersRuCellType } from './CheckersRuCellType';
import { checkersRuConfig } from './CheckersRuConfig';
import { CheckersRuUnitOwner } from './CheckersRuUnitOwner';
import { CheckersRuUnitType } from './CheckersRuUnitType';

export function createCheckersRu(): Game<CheckersRuCellType, CheckersRuUnitType, CheckersRuUnitOwner> {
  return new Game(checkersRuConfig)
}
