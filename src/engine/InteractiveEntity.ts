import { AvailableAction } from './AvailableAction';

export class InteractiveEntity<TCellType, TUnitType> {
  protected _actions: AvailableAction<TCellType, TUnitType>[] = [];

  public get actions(): AvailableAction<TCellType, TUnitType>[] {
    return this._actions;
  }

  public addAction(action: AvailableAction<TCellType, TUnitType>[]): void {
    this._actions.push(...action);
  }

  public removeAction(action: AvailableAction<TCellType, TUnitType>): void {
    const index = this._actions.indexOf(action);
    if (index !== -1) {
      this._actions.splice(index, 1);
    }
  }

  public clearActions(): void {
    this._actions = [];
  }

}
