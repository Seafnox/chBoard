import { Cell } from './Cell';
import { EventEmitter } from './EventEmitter';
import { InteractiveEntity } from './InteractiveEntity';
import { Vector2d } from './Vector2d';

export class Unit<TCellType, TUnitType, TOwner> extends InteractiveEntity<TCellType, TUnitType, TOwner> {
  private _prevCell?: Cell<TCellType, TUnitType, TOwner>;

  constructor(
    private _cell: Cell<TCellType, TUnitType, TOwner>,
    private _type: TUnitType,
    private _owner: TOwner,
    public readonly eventBus: EventEmitter,
  ) {
    super();
  }

  public get location(): string {
    return this._cell.location;
  }

  public get position(): Vector2d {
    return this._cell.position;
  }

  public get type(): TUnitType {
    return this._type;
  }

  public get lastMove(): [Cell<TCellType, TUnitType, TOwner> | undefined, Cell<TCellType, TUnitType, TOwner>] {
    return [this._prevCell, this._cell];
  }

  public changeType(type: TUnitType): void {
    this._type = type;
  }

  public setCell(cell: Cell<TCellType, TUnitType, TOwner>): void {
    // TODO Add Pathfinder for smooth and correct animations
    this._prevCell = this._cell;
    this._cell = cell;
  }

  public changeOwner(owner: TOwner): void {
    this._owner = owner;
  }

  public get owner(): TOwner {
    return this._owner;
  }
}
