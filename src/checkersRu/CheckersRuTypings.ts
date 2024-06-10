import { AvailableAction } from '../engine/AvailableAction';
import { Board } from '../engine/Board';
import { InteractiveEntity } from '../engine/InteractiveEntity';
import { Unit } from '../engine/Unit';
import { CheckersRuCellType } from './CheckersRuCellType';
import { CheckersRuUnitOwner } from './CheckersRuUnitOwner';
import { CheckersRuUnitType } from './CheckersRuUnitType';

export type CheckersRuUnit = Unit<CheckersRuCellType, CheckersRuUnitType, CheckersRuUnitOwner>;
export type CheckersRuInteractiveEntity = InteractiveEntity<CheckersRuCellType, CheckersRuUnitType, CheckersRuUnitOwner>;
export type CheckersRuBoard = Board<CheckersRuCellType, CheckersRuUnitType, CheckersRuUnitOwner>;
export type CheckersRuAvailableAction = AvailableAction<CheckersRuCellType, CheckersRuUnitType, CheckersRuUnitOwner, CheckersRuUnit>;
