import { CommonActionChange } from './actionChanges/CommonActionChange';
import { EventEmitter } from './EventEmitter';
import { Game } from './Game';
import { Enumerable } from './Enumerable';

export abstract class Action<TCellType, TUnitType, TUnitOwner extends Enumerable, TInteractiveEntity> {
  constructor(
    public readonly entity: TInteractiveEntity,
    public readonly game: Game<TCellType, TUnitType, TUnitOwner>,
    public readonly eventBus: EventEmitter,
  ) {}

  abstract get priority(): number;
  abstract get isActive(): boolean;

  abstract get changes(): CommonActionChange<TInteractiveEntity>[];

  public run(): void {
    this._run();

    this.eventBus.emit('Action', this);
  }

  protected abstract _run(): void;
}
