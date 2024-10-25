import { Vector } from 'excalibur';
import { CheckersUnitOwner } from '../../../engineCheckers/simple/commons/CheckersUnitOwner';
import { CheckersUnitType } from '../../../engineCheckers/simple/commons/CheckersUnitType';
import { cellSize, playerSchemes } from '../CheckersConstants';
import { CurrentTurnElement } from '../CurrentTurnElement';

export function buildTurnUI(
  position: Vector,
  initialPlayer: CheckersUnitOwner,
  unitType: CheckersUnitType,
  useText: boolean = true,
  _cellSize = cellSize,
): CurrentTurnElement<CheckersUnitOwner, CheckersUnitType> {
  return new CurrentTurnElement<CheckersUnitOwner, CheckersUnitType>({
    cellSize: _cellSize,
    playerSchemes,
    initialPlayer,
    unitType,
    position,
    useText,
  });
}
