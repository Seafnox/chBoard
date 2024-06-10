import { InteractiveEntity } from './InteractiveEntity';

export class Unit<TCellType, TUnitType, TOwner> extends InteractiveEntity<TCellType, TUnitType, TOwner> {
  constructor(
    // TODO unit should have cell, not position
    private x: number,
    private y: number,
    private _type: TUnitType,
    private _owner: TOwner,
  ) {
    super();
  }

  public get location(): string {
    return `${this.x},${this.y}`;
  }

  public get position(): [number, number] {
    return [this.x, this.y];
  }

  public get type(): TUnitType {
    return this._type;
  }

  public changeType(type: TUnitType): void {
    this._type = type;
  }

  public changePosition(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  public changeOwner(owner: TOwner): void {
    this._owner = owner;
  }

  public get owner(): TOwner {
    return this._owner;
  }
}
