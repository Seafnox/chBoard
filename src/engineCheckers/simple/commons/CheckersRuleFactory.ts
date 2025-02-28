import { BiteRulesForChecker } from '../ru/rules/BiteRulesForChecker';
import { BiteRulesForKing } from '../ru/rules/BiteRulesForKing';
import { MoveRulesForChecker } from '../ru/rules/MoveRulesForChecker';
import { MoveRulesForKing } from '../ru/rules/MoveRulesForKing';
import { CheckersRule } from './CheckersRule';

export enum CheckersRuleType {
  BITE_CHECKER = 'BITE_CHECKER',
  BITE_KING = 'BITE_KING',
  MOVE_CHECKER = 'MOVE_CHECKER',
  MOVE_KING = 'MOVE_KING'
}

export function createCheckersRule(type: string): CheckersRule {
  switch (type) {
    case CheckersRuleType.BITE_CHECKER:
      return new BiteRulesForChecker();
    case CheckersRuleType.BITE_KING:
      return new BiteRulesForKing();
    case CheckersRuleType.MOVE_CHECKER:
      return new MoveRulesForChecker();
    case CheckersRuleType.MOVE_KING:
      return new MoveRulesForKing();
    default:
      throw new Error(`Unknown rule type: ${type}`);
  }
} 