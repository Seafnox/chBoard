import { Vector } from 'excalibur';
import { TwoPlayerUnitOwner } from '../../../engine/twoPlayer/TwoPlayerUnitOwner';
import { CheckersUnitType } from '../../../engineCheckers/simple/commons/CheckersUnitType';
import { cellSize, playerSchemes } from '../CheckersConstants';
import { CurrentTurnElement } from '../CurrentTurnElement';

export function buildTurnUI(
  position: Vector,
  unitType: CheckersUnitType,
  useText: boolean = true,
  _cellSize = cellSize,
): CurrentTurnElement<TwoPlayerUnitOwner, CheckersUnitType> {
  return new CurrentTurnElement<TwoPlayerUnitOwner, CheckersUnitType>({
    cellSize: _cellSize,
    playerSchemes,
    unitType,
    position,
    useText,
  });
}
