import { TurnManager } from './TurnManager';
import { Enumerable } from './Enumerable';
import { Game } from './Game';

export class SequentialTurnManager4P<TCellType extends Enumerable, TUnitType extends Enumerable, TUnitOwner extends Enumerable> 
  extends TurnManager<TCellType, TUnitType, TUnitOwner> {
  
  private currentIndex = 0;

  constructor(game: Game<TCellType, TUnitType, TUnitOwner>) {
    const initialIndex = 0;
    super(game, {
      initialOwner: game.initialConfig.unitOwners[initialIndex],
      nextTurnOwnerFn: (current) => {
        if (!current) throw new Error('Current owner is undefined');
        const index = game.initialConfig.unitOwners.indexOf(current);
        if (index === -1) throw new Error('Current owner not found');
        return game.initialConfig.unitOwners[(index + 1) % 4];
      },
      endGameConditionFn: () => false,
      winnerConditionFn: () => undefined
    });
    this.currentIndex = initialIndex;
  }

  nextTurn(): void {
    this.currentIndex = (this.currentIndex + 1) % 4;
  }

  copy(source: TurnManager<TCellType, TUnitType, TUnitOwner>): TurnManager<TCellType, TUnitType, TUnitOwner> {
    if (!(source instanceof SequentialTurnManager4P)) {
      throw new Error('Invalid source type for copy');
    }
    this.currentIndex = source.currentIndex;
    return this;
  }
} 