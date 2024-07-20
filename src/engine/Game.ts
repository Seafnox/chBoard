import { Board } from './Board';
import { EventEmitter } from './EventEmitter';
import { GameConfig } from './GameConfig';
import { InteractiveEntity } from './InteractiveEntity';
import { Enumerable } from './Enumerable';
import { LogItem } from './LogItem';
import { TurnManager } from './TurnManager';

export class Game<TCellType, TUnitType, TUnitOwner extends Enumerable> {
  public readonly board: Board<TCellType, TUnitType, TUnitOwner>;
  public readonly eventBus: EventEmitter = new EventEmitter();
  public readonly turnManager: TurnManager<TCellType, TUnitType, TUnitOwner>;
  // TODO add turn counter and mark items on push
  public readonly gameLog: LogItem<TCellType, TUnitType, TUnitOwner>[] = [];
  public isGameEnded: boolean = false;
  private _winner?: TUnitOwner; // TODO add Player Types

  constructor(
    public readonly initialConfig: GameConfig<TCellType, TUnitType, TUnitOwner>,
  ) {
    this.board = new Board(initialConfig, this);
    this.turnManager = new initialConfig.turnManager(this);

    this.initialConfig.rules.forEach(rule => {
      this.interactiveEntities.forEach(interactiveEntity => {
        if (rule.isSuitable(interactiveEntity)) {
          interactiveEntity.addAction(rule.getAction(interactiveEntity, this));
        }
      })
    })
  }

  get winner(): TUnitOwner | undefined {
    return this._winner;
  }

  get interactiveEntities(): InteractiveEntity<TCellType, TUnitType, TUnitOwner>[] {
    return [
      this.board,
      ...this.board.cells,
      ...this.board.units,
    ];
  }

  endGame(winner: TUnitOwner) {
    this.isGameEnded = true;
    this._winner = winner;
    this.eventBus.pause();
    this.interactiveEntities.forEach(interactiveEntity => {
      interactiveEntity.clearActions();
    })
  }
}
