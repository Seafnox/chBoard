import { Action } from './Action';

export class InteractiveEntity<TCellType, TUnitType, TOwner> {
  protected _actions: Action<TCellType, TUnitType, TOwner, this>[] = [];

  public get actions(): Action<TCellType, TUnitType, TOwner, this>[] {
    return this._actions;
  }

  public addAction(action: Action<TCellType, TUnitType, TOwner, this>[]): void {
    this._actions.push(...action);
  }

  public removeAction(action: Action<TCellType, TUnitType, TOwner, this>): void {
    const index = this._actions.indexOf(action);
    if (index !== -1) {
      this._actions.splice(index, 1);
    }
  }

  public clearActions(): void {
    this._actions = [];
  }

}
