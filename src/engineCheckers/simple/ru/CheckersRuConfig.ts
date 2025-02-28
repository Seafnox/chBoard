import { UnitConfig } from '../../../engine/BoardConfig';
import { TwoPlayerUnitOwner } from '../../../engine/twoPlayer/TwoPlayerUnitOwner';
import { CheckersCellType } from '../commons/CheckersCellType';
import { CheckersUnitType } from '../commons/CheckersUnitType';
import { TurnManagerType } from 'src/engine/TurnManagerType';
import { CheckersRuleType } from '../commons/CheckersRuleFactory';
import { SerializedGameConfig } from '../../../engine/SerializedGameConfig';

const cellMap: Record<string, CheckersCellType> = {};

for(let x = 0; x < 8; x++) {
  for(let y = 0; y < 8; y++) {
    cellMap[`${x},${y}`] = CheckersCellType.Simple;
  }
}

const unitMap: Record<string, UnitConfig<CheckersUnitType, TwoPlayerUnitOwner>> = {}

for(let x = 0; x < 8; x++) {
  for(let y = 0; y < 3; y++) {
    if ((x + y) % 2 === 0) continue;

    unitMap[`${x},${y}`] = {
      type: CheckersUnitType.King,
      owner: TwoPlayerUnitOwner.Black,
    };
  }
}
for(let x = 0; x < 8; x++) {
  for(let y = 0; y < 3; y++) {
    if ((x + 7 - y) % 2 === 0) continue;

    unitMap[`${x},${7-y}`] = {
      type: CheckersUnitType.Checker,
      owner: TwoPlayerUnitOwner.White,
    };
  }
}

export const checkersRuConfig: SerializedGameConfig = {
  cellMap,
  unitMap,
  width: 8,
  height: 8,
  ruleTypes: [
    CheckersRuleType.MOVE_CHECKER,
    CheckersRuleType.BITE_CHECKER,
    CheckersRuleType.MOVE_KING,
    CheckersRuleType.BITE_KING,
  ],
  turnManagerType: TurnManagerType.SEQUENTIAL_2P,
  unitOwners: [TwoPlayerUnitOwner.Black, TwoPlayerUnitOwner.White]
};
