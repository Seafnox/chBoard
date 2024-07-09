import { Action } from '../../../engine/Action';
import { Board } from '../../../engine/Board';
import { Game } from '../../../engine/Game';
import { GameConfig } from '../../../engine/GameConfig';
import { InteractiveEntity } from '../../../engine/InteractiveEntity';
import { Unit } from '../../../engine/Unit';
import { CheckersCellType } from '../commons/CheckersCellType';
import { CheckersUnitOwner } from '../commons/CheckersUnitOwner';
import { CheckersUnitType } from '../commons/CheckersUnitType';

export type CheckersGame = Game<CheckersCellType, CheckersUnitType, CheckersUnitOwner>;
export type CheckersGameConfig = GameConfig<CheckersCellType, CheckersUnitType, CheckersUnitOwner>;
export type CheckersBoard = Board<CheckersCellType, CheckersUnitType, CheckersUnitOwner>;
export type CheckersUnit = Unit<CheckersCellType, CheckersUnitType, CheckersUnitOwner>;
export type CheckersInteractiveEntity = InteractiveEntity<CheckersCellType, CheckersUnitType, CheckersUnitOwner>;
export type CheckersAvailableAction = Action<CheckersCellType, CheckersUnitType, CheckersUnitOwner, CheckersUnit>;
