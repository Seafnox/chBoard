import { Action } from '../../../engine/Action';
import { CheckersUnit } from '../ru/CheckersRuTypings';
import { CheckersCellType } from './CheckersCellType';
import { CheckersUnitOwner } from './CheckersUnitOwner';
import { CheckersUnitType } from './CheckersUnitType';

export abstract class CheckersAction extends Action<CheckersCellType, CheckersUnitType, CheckersUnitOwner, CheckersUnit> {}
