import { Enumerable } from './Enumerable';
import { Game } from './Game';
import { InteractiveEntity } from './InteractiveEntity';
import { Unit } from './Unit';
import { Vector2d } from './Vector2d';

export class Cell<TCellType extends Enumerable, TUnitType extends Enumerable, TUnitOwner extends Enumerable> extends InteractiveEntity<TCellType, TUnitType, TUnitOwner> {
  private _unit?: Unit<TCellType, TUnitType, TUnitOwner>;

  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly type: TCellType,
    public readonly game: Game<TCellType, TUnitType, TUnitOwner>,
  ) {
    super();
  }

  public get location(): string {
    return `${this.x},${this.y}`;
  }

  public get position(): Vector2d {
    return new Vector2d(this.x, this.y);
  }

  public get unit(): Unit<TCellType, TUnitType, TUnitOwner> | undefined {
    return this._unit;
  }

  public setUnit(unit?: Unit<TCellType, TUnitType, TUnitOwner>): void {
    this._unit = unit;
  }
}
