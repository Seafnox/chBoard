import { AvailableAction } from './AvailableAction';

export class InteractiveEntity<TCellType, TUnitType, TOwner> {
  protected _actions: AvailableAction<TCellType, TUnitType, TOwner, this>[] = [];

  public get actions(): AvailableAction<TCellType, TUnitType, TOwner, this>[] {
    return this._actions;
  }

  public addAction(action: AvailableAction<TCellType, TUnitType, TOwner, this>[]): void {
    this._actions.push(...action);
  }

  public removeAction(action: AvailableAction<TCellType, TUnitType, TOwner, this>): void {
    const index = this._actions.indexOf(action);
    if (index !== -1) {
      this._actions.splice(index, 1);
    }
  }

  public clearActions(): void {
    this._actions = [];
  }

}
