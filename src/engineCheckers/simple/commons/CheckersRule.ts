import { Rule } from '../../../engine/Rule';
import { CheckersUnit } from '../ru/CheckersRuTypings';
import { CheckersCellType } from './CheckersCellType';
import { CheckersUnitOwner } from './CheckersUnitOwner';
import { CheckersUnitType } from './CheckersUnitType';

export abstract class CheckersRule extends Rule<CheckersCellType, CheckersUnitType, CheckersUnitOwner, CheckersUnit> {}
