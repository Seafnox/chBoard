import { Action } from './Action';
import { Enumerable } from './Enumerable';

export class InteractiveEntity<TCellType extends Enumerable, TUnitType extends Enumerable, TUnitOwner extends Enumerable> {
  protected _actions: Action<TCellType, TUnitType, TUnitOwner, this>[] = [];

  public get actions(): Action<TCellType, TUnitType, TUnitOwner, this>[] {
    return this._actions;
  }

  public addAction(action: Action<TCellType, TUnitType, TUnitOwner, this>[]): void {
    this._actions.push(...action);
  }

  public removeAction(action: Action<TCellType, TUnitType, TUnitOwner, this>): void {
    const index = this._actions.indexOf(action);
    if (index !== -1) {
      this._actions.splice(index, 1);
    }
  }

  public clearActions(): void {
    this._actions = [];
  }

}
