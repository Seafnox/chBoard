import { InteractiveEntity } from './InteractiveEntity';
import { Unit } from './Unit';

export class Cell<TCellType, TUnitType> extends InteractiveEntity<TCellType, TUnitType> {
  private _unit?: Unit<TCellType, TUnitType>;

  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly type: TCellType,
  ) {
    super();
  }

  public get unit(): Unit<TCellType, TUnitType> | undefined {
    return this._unit;
  }

  public setUnit(unit?: Unit<TCellType, TUnitType>): void {
    this._unit = unit;
  }
}
