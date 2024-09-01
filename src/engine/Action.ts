import { ActionChange } from './actionChanges/ActionChange';
import { Game } from './Game';
import { Enumerable } from './Enumerable';
import { InteractiveEntity } from './InteractiveEntity';
import { Rule } from './Rule';

export abstract class Action<TCellType extends Enumerable, TUnitType extends Enumerable, TUnitOwner extends Enumerable, TInteractiveEntity extends InteractiveEntity<TCellType, TUnitType, TUnitOwner>> {
  constructor(
    public readonly game: Game<TCellType, TUnitType, TUnitOwner>,
    public readonly rule: Rule<TCellType, TUnitType, TUnitOwner, TInteractiveEntity>,
    public readonly entity: TInteractiveEntity,
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
