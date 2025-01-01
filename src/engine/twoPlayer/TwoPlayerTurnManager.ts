import { Enumerable } from '../Enumerable';
import { Game } from '../Game';
import { TurnManager } from '../TurnManager';
import { Unit } from '../Unit';
import { TwoPlayerUnitOwner } from './TwoPlayerUnitOwner';

export class TwoPlayerTurnManager<TCellType extends Enumerable, TUnitType extends Enumerable> extends TurnManager<TCellType, TUnitType, TwoPlayerUnitOwner> {

  constructor(
    public readonly game: Game<TCellType, TUnitType, TwoPlayerUnitOwner>,
  ) {
    super(game, {
      initialOwner: TwoPlayerUnitOwner.White,
      endGameConditionFn: () => this.isEndGame(),
      winnerConditionFn: () => this.getWinner(),
      nextTurnOwnerFn: () => this.getNextTurnOwner(),
    });
  }

  isEndGame(): boolean {
    return this.getActiveWhiteUnits().length === 0 || this.getActiveBlackUnits().length === 0;
  }

  getWinner(): TwoPlayerUnitOwner[] {
    if (this.getActiveWhiteUnits().length !== 0 && this.getActiveBlackUnits().length === 0) return [TwoPlayerUnitOwner.White];
    if (this.getActiveWhiteUnits().length === 0 && this.getActiveBlackUnits().length !== 0) return [TwoPlayerUnitOwner.Black];

    return [];
  }

  getNextTurnOwner(): TwoPlayerUnitOwner {
    return this._activeOwner === TwoPlayerUnitOwner.White ? TwoPlayerUnitOwner.Black : TwoPlayerUnitOwner.White;
  }

  getActiveBlackUnits(): Unit<TCellType, TUnitType, TwoPlayerUnitOwner>[] {
    return this.game.board.units
      .filter(unit => unit.owner === TwoPlayerUnitOwner.Black)
      .filter(unit => !unit.isDead);
  }

  getActiveWhiteUnits(): Unit<TCellType, TUnitType, TwoPlayerUnitOwner>[] {
    return this.game.board.units
      .filter(unit => unit.owner === TwoPlayerUnitOwner.White)
      .filter(unit => !unit.isDead);
  }
}
