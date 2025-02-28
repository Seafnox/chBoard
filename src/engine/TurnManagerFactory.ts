import { TurnManager } from './TurnManager';
import { Enumerable } from './Enumerable';
import { Game } from './Game';
import { SequentialTurnManager2P } from './twoPlayer/SequentialTurnManager2P';
import { SequentialTurnManager3P } from './SequentialTurnManager3P';
import { SequentialTurnManager4P } from './SequentialTurnManager4P';
import { TurnManagerType } from './TurnManagerType';

export function createTurnManager<TCellType extends Enumerable, TUnitType extends Enumerable, TUnitOwner extends Enumerable>(
  type: TurnManagerType,
  game: Game<TCellType, TUnitType, TUnitOwner>
): TurnManager<TCellType, TUnitType, TUnitOwner> {
  switch (type) {
    case TurnManagerType.SEQUENTIAL_2P:
      return new SequentialTurnManager2P(game);
    case TurnManagerType.SEQUENTIAL_3P:
      return new SequentialTurnManager3P(game);
    case TurnManagerType.SEQUENTIAL_4P:
      return new SequentialTurnManager4P(game);
    default:
      throw new Error(`Unknown TurnManager type: ${type}`);
  }
} 