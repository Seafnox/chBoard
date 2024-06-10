import { InteractiveEntity } from './InteractiveEntity';
import { Unit } from './Unit';

export class Cell<TCellType, TUnitType, TOwner> extends InteractiveEntity<TCellType, TUnitType, TOwner> {
  private _unit?: Unit<TCellType, TUnitType, TOwner>;

  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly type: TCellType,
  ) {
    super();
  }

  public get unit(): Unit<TCellType, TUnitType, TOwner> | undefined {
    return this._unit;
  }

  public setUnit(unit?: Unit<TCellType, TUnitType, TOwner>): void {
    this._unit = unit;
  }
}
