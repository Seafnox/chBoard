import { Board } from './Board';
import { EventEmitter } from './EventEmitter';
import { GameConfig } from './GameConfig';
import { InteractiveEntity } from './InteractiveEntity';
import { TurnManager } from './TurnManager';

export class Game<TCellType, TUnitType, TOwner> {
  public readonly board: Board<TCellType, TUnitType, TOwner>;
  public readonly eventBus: EventEmitter = new EventEmitter();
  public readonly turnManager: TurnManager<TCellType, TUnitType, TOwner>;
  public isGameEnded: boolean = false;
  private _winner?: TOwner; // TODO add Player Types

  constructor(
    public readonly initialConfig: GameConfig<TCellType, TUnitType, TOwner>,
  ) {
    this.board = new Board(initialConfig, this.eventBus);
    this.turnManager = new initialConfig.turnManager(this, this.eventBus);

    this.initialConfig.rules.forEach(rule => {
      this.interactiveEntities.forEach(interactiveEntity => {
        if (rule.isSuitable(interactiveEntity)) {
          interactiveEntity.addAction(rule.getAction(interactiveEntity, this, this.eventBus));
        }
      })
    })
  }

  get winner(): TOwner | undefined {
    return this._winner;
  }

  get interactiveEntities(): InteractiveEntity<TCellType, TUnitType, TOwner>[] {
    return [
      this.board,
      ...this.board.cells,
      ...this.board.units,
    ];
  }

  endGame(winner: TOwner) {
    this.isGameEnded = true;
    this._winner = winner;
    this.eventBus.pause();
    this.interactiveEntities.forEach(interactiveEntity => {
      interactiveEntity.clearActions();
    })
  }
}
