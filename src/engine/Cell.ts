import { EventEmitter } from './EventEmitter';
import { InteractiveEntity } from './InteractiveEntity';
import { Unit } from './Unit';
import { Vector2d } from './Vector2d';

export class Cell<TCellType, TUnitType, TOwner> extends InteractiveEntity<TCellType, TUnitType, TOwner> {
  private _unit?: Unit<TCellType, TUnitType, TOwner>;

  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly type: TCellType,
    public readonly eventBus: EventEmitter,
  ) {
    super();
  }

  public get location(): string {
    return `${this.x},${this.y}`;
  }

  public get position(): Vector2d {
    return new Vector2d(this.x, this.y);
  }

  public get unit(): Unit<TCellType, TUnitType, TOwner> | undefined {
    return this._unit;
  }

  public setUnit(unit?: Unit<TCellType, TUnitType, TOwner>): void {
    this._unit = unit;
  }
}
