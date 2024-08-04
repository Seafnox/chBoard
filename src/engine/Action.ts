import { ActionChange } from './actionChanges/ActionChange';
import { Game } from './Game';
import { Enumerable } from './Enumerable';

export abstract class Action<TCellType, TUnitType, TUnitOwner extends Enumerable, TInteractiveEntity> {
  constructor(
    public readonly entity: TInteractiveEntity,
    public readonly game: Game<TCellType, TUnitType, TUnitOwner>,
  ) {}

  abstract get priority(): number;
  abstract get isActive(): boolean;

  abstract get changes(): ActionChange<TInteractiveEntity>[];

  public get isCorrectPriority(): boolean {
    return this.game.maxPriority == -1 || this.game.maxPriority <= this.priority;
  }

  public run(): void {
    // TODO change to step by step changes from list, without custom running
    this._run();

    this.game.eventBus.emit('Action', this);
  }

  protected abstract _run(): void;
}
