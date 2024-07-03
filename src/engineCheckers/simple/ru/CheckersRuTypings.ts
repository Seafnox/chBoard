import { AvailableAction } from '../../../engine/AvailableAction';
import { Board } from '../../../engine/Board';
import { InteractiveEntity } from '../../../engine/InteractiveEntity';
import { Unit } from '../../../engine/Unit';
import { CheckersCellType } from '../commons/CheckersCellType';
import { CheckersUnitOwner } from '../commons/CheckersUnitOwner';
import { CheckersUnitType } from '../commons/CheckersUnitType';

export type CheckersRuUnit = Unit<CheckersCellType, CheckersUnitType, CheckersUnitOwner>;
export type CheckersRuInteractiveEntity = InteractiveEntity<CheckersCellType, CheckersUnitType, CheckersUnitOwner>;
export type CheckersRuBoard = Board<CheckersCellType, CheckersUnitType, CheckersUnitOwner>;
export type CheckersRuAvailableAction = AvailableAction<CheckersCellType, CheckersUnitType, CheckersUnitOwner, CheckersRuUnit>;
