import { GameConfig } from '../../../engine/GameConfig';
import { createCheckersRule } from '../commons/CheckersRuleFactory';
import { SerializedGameConfig } from '../../../engine/SerializedGameConfig';
import { CheckersCellType } from '../commons/CheckersCellType';
import { CheckersUnitType } from '../commons/CheckersUnitType';
import { TwoPlayerUnitOwner } from '../../../engine/twoPlayer/TwoPlayerUnitOwner';

export function createGameConfig(serializedConfig: SerializedGameConfig): GameConfig<CheckersCellType, CheckersUnitType, TwoPlayerUnitOwner> {
  return {
    ...serializedConfig,
    rules: serializedConfig.ruleTypes.map(type => createCheckersRule(type))
  };
} 