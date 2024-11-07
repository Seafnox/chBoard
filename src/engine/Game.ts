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
  public isGameEnded: boolean = false;
  public maxPriority: number = -1;
  private readonly gameLog: Record<number, CommonActionChange[]> = [[]];
  private turnCount: number = 0;
  private turnManager: TurnManager<TCellType, TUnitType, TUnitOwner>;
  private _winner?: string; // TODO add Player Types
  private actionMap: Record<string, Action<TCellType, TUnitType, TUnitOwner, any>> = {};

  constructor(
    public readonly initialConfig: GameConfig<TCellType, TUnitType, TUnitOwner>,
  ) {
    this.actionMap = {};
    this.board = new Board(initialConfig, this);
    this.turnManager = new initialConfig.turnManager(this);

    this.initialConfig.rules.forEach(rule => {
      this.interactiveEntities.forEach(interactiveEntity => {
        if (rule.isSuitable(interactiveEntity)) {
          const actions = rule.getActions(this, interactiveEntity);
          interactiveEntity.addActions(actions);
          actions.forEach(action => {
            this.actionMap[action.id] = action;
          });
        }
      })
    })
  }

  get activeOwner(): TUnitOwner {
    return this.turnManager.activeOwner;
  }

  get winner(): string | undefined {
    return this._winner;
  }

  get interactiveEntities(): InteractiveEntity<TCellType, TUnitType, TUnitOwner>[] {
    return this.board.interactiveEntities;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get actions(): Action<TCellType, TUnitType, TUnitOwner, any>[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.interactiveEntities.reduce<Action<TCellType, TUnitType, TUnitOwner, any>[]>(
      (actions, entity) => [...actions, ...entity.actions],
      []
    );
  }

  get lastActionChanges(): CommonActionChange[] {
    return this.getTurnActionChanges(this.turnCount);
  }

  getTurnActionChanges(turnNumber: number): CommonActionChange[] {
    return this.gameLog[turnNumber];
  }

  getAllTurnActionChanges(): CommonActionChange[] {
    return Object.values(this.gameLog).flat();
  }

  // TODO return consequence of action (real ActionChanges)
  makeAction(actionId: string): void {
    const action = this.actionMap[actionId];
    if (!action) {
      throw new Error(`Action with id ${actionId} is not found`);
    }
    action.run();
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

  endGame(endGameChange: EndGameChange) {
    this.isGameEnded = true;
    this._winner = endGameChange.winner;
    this.eventBus.pause();
    this.interactiveEntities.forEach(interactiveEntity => {
      interactiveEntity.clearActions();
    });
    this.gameLog[this.turnCount].push(endGameChange);
  }

  nextTurn(event: SwitchingTurnChange) {
    this.emit(event);
    this.turnCount++;
    this.gameLog[this.turnCount] = [];
    this.turnManager.nextTurn();
  }

  emit(event: CommonActionChange) {
    this.gameLog[this.turnCount].push(event);
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

    this.actionMap = {};

    this._winner = winner;

    this.board.copy(game.board);
    this.turnManager.copy(game.turnManager);

    this.interactiveEntities.forEach(interactiveEntity => {
      const actions = interactiveEntity.actions;
      actions.forEach(action => {
        this.actionMap[action.id] = action;
      });
    });

    return this;
  }
}
