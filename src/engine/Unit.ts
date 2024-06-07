import { InteractiveEntity } from './InteractiveEntity';

export class Unit<TCellType, TUnitType> extends InteractiveEntity<TCellType, TUnitType> {
  constructor(
    private x: number,
    private y: number,
    private _type: TUnitType,
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
}
