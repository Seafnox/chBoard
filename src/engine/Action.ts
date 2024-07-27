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

  public run(): void {
    this._run();

    this.game.eventBus.emit('Action', this);
  }

  protected abstract _run(): void;
}
