import { getId } from '../utils/getId';
import { Action } from './Action';
import { CommonActionChange } from './actionChanges/CommonActionChange';
import { EndGameChange } from './actionChanges/EndGameChange';
import { SwitchingTurnChange } from './actionChanges/SwitchingTurnChange';
import { Board } from './Board';
import { EventEmitter } from './EventEmitter';
import { GameConfig } from './GameConfig';
import { InteractiveEntity } from './InteractiveEntity';
import { Enumerable } from './Enumerable';
import { TurnManager } from './TurnManager';

export class Game<TCellType extends Enumerable, TUnitType extends Enumerable, TUnitOwner extends Enumerable> {
  public readonly id = getId();
  public readonly board: Board<TCellType, TUnitType, TUnitOwner>;
  public readonly eventBus: EventEmitter = new EventEmitter();
  // TODO add turn counter and mark items on push
  public readonly gameLog: CommonActionChange<TCellType, TUnitType, TUnitOwner, InteractiveEntity<TCellType, TUnitType, TUnitOwner>>[] = [];
  public isGameEnded: boolean = false;
  public maxPriority: number = -1;
  private turnManager: TurnManager<TCellType, TUnitType, TUnitOwner>;
  private _winner?: TUnitOwner; // TODO add Player Types

  constructor(
    public readonly initialConfig: GameConfig<TCellType, TUnitType, TUnitOwner>,
  ) {
    this.board = new Board(initialConfig, this);
    this.turnManager = new initialConfig.turnManager(this);

    this.initialConfig.rules.forEach(rule => {
      this.interactiveEntities.forEach(interactiveEntity => {
        if (rule.isSuitable(interactiveEntity)) {
          interactiveEntity.addActions(rule.getActions(this, interactiveEntity));
        }
      })
    })
  }

  get activeOwner(): TUnitOwner {
    return this.turnManager.activeOwner;
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get actions(): Action<TCellType, TUnitType, TUnitOwner, any>[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.interactiveEntities.reduce<Action<TCellType, TUnitType, TUnitOwner, any>[]>(
      (actions, entity) => [...actions, ...entity.actions],
      []
    );
  }

  doChanges() {
    this.maxPriority = -1;
    this.actions
      .filter(action => action.isAvailable)
      .forEach(action => {
        if (action.priority > this.maxPriority) {
          this.maxPriority = action.priority;
        }
      });
  }

  endGame(endGameChange: EndGameChange<TCellType, TUnitType, TUnitOwner, InteractiveEntity<TCellType, TUnitType, TUnitOwner>>) {
    this.isGameEnded = true;
    this._winner = endGameChange.winner;
    this.eventBus.pause();
    this.interactiveEntities.forEach(interactiveEntity => {
      interactiveEntity.clearActions();
    });
    this.gameLog.push(endGameChange);
  }

  nextTurn(event: SwitchingTurnChange<TCellType, TUnitType, TUnitOwner, InteractiveEntity<TCellType, TUnitType, TUnitOwner>>) {
    this.turnManager.nextTurn();
    this.emit(event);
  }

  emit(event: CommonActionChange<TCellType, TUnitType, TUnitOwner, InteractiveEntity<TCellType, TUnitType, TUnitOwner>>) {
    this.gameLog.push(event);
    if (this.id === '#0') console.log(event);
  }

  clone(): Game<TCellType, TUnitType, TUnitOwner> {
    return new Game<TCellType, TUnitType, TUnitOwner>(this.initialConfig).copy(this);
  }

  copy(game: Game<TCellType, TUnitType, TUnitOwner>): Game<TCellType, TUnitType, TUnitOwner> {
    const { isGameEnded, maxPriority, winner } = game;
    Object.assign(this, {
      isGameEnded,
      maxPriority,
    });

    this._winner = winner;

    this.board.copy(game.board);
    this.turnManager.copy(game.turnManager);

    return this;
  }
}
