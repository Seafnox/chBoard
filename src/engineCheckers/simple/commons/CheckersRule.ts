import { Rule } from '../../../engine/Rule';
import { TwoPlayerUnitOwner } from '../../../engine/twoPlayer/TwoPlayerUnitOwner';
import { CheckersUnit } from '../ru/CheckersRuTypings';
import { CheckersCellType } from './CheckersCellType';
import { CheckersUnitType } from './CheckersUnitType';

export abstract class CheckersRule extends Rule<CheckersCellType, CheckersUnitType, TwoPlayerUnitOwner, CheckersUnit> {}
