import { getId } from '../utils/getId';
import { ActionChange } from './actionChanges/ActionChange';
import { ActionChangeType } from './actionChanges/ActionChangeType';
import { SwitchingTurnChange } from './actionChanges/SwitchingTurnChange';
import { Game } from './Game';
import { Enumerable } from './Enumerable';
import { InteractiveEntity } from './InteractiveEntity';
import { Rule } from './Rule';

export abstract class Action<TCellType extends Enumerable, TUnitType extends Enumerable, TUnitOwner extends Enumerable, TInteractiveEntity extends InteractiveEntity<TCellType, TUnitType, TUnitOwner>> {
  public id = getId();

  constructor(
    public readonly game: Game<TCellType, TUnitType, TUnitOwner>,
    public readonly rule: Rule<TCellType, TUnitType, TUnitOwner, TInteractiveEntity>,
    public readonly entity: TInteractiveEntity,
  ) {}

  abstract get priority(): number;
  abstract get isActive(): boolean;
  abstract get isAvailable(): boolean;

  abstract get changes(): ActionChange<TInteractiveEntity>[];
  abstract get shouldSwitchTurn(): boolean;

  get isCorrectPriority(): boolean {
    return this.game.maxPriority == -1 || this.game.maxPriority <= this.priority;
  }

  get switchTurnAction(): SwitchingTurnChange<TInteractiveEntity> {
    return {
      type: ActionChangeType.SwitchTurn,
      entity: this.entity,
    }
  }


  public run(isVirtual: boolean = false): void {
    this.changes.forEach(change => {
      this.runChanges(change, isVirtual);
      this.game.eventBus.emit('Action', change);
    });

    if (!isVirtual && this.shouldSwitchTurn) {
      const change = this.switchTurnAction;
      this.game.nextTurn(change);
      this.game.eventBus.emit('Action', change);
    }

    this.game.doChanges();
  }

  protected abstract runChanges(change: ActionChange<TInteractiveEntity>, isVirtual: boolean): void;
}
