import { vec } from 'excalibur';
import { CheckersUnitOwner } from '../../../engineCheckers/simple/commons/CheckersUnitOwner';
import { CheckersUnitType } from '../../../engineCheckers/simple/commons/CheckersUnitType';
import { cellSize, playerSchemes } from '../CheckersConstants';
import { CurrentTurnElement } from '../CurrentTurnElement';

export function buildTurnUI(initialPlayer: CheckersUnitOwner, unitType: CheckersUnitType): CurrentTurnElement<CheckersUnitOwner, CheckersUnitType> {
  return new CurrentTurnElement<CheckersUnitOwner, CheckersUnitType>({
    cellSize,
    playerSchemes,
    initialPlayer,
    unitType,
    position: vec(10, 100),
  });
}
