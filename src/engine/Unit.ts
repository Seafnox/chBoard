import { Cell } from './Cell';
import { Enumerable } from './Enumerable';
import { Game } from './Game';
import { InteractiveEntity } from './InteractiveEntity';
import { Vector2d } from './Vector2d';

export class Unit<TCellType, TUnitType, TUnitOwner extends Enumerable> extends InteractiveEntity<TCellType, TUnitType, TUnitOwner> {
  private _prevCell?: Cell<TCellType, TUnitType, TUnitOwner>;
  public isDead = false;

  constructor(
    private _cell: Cell<TCellType, TUnitType, TUnitOwner>,
    private _type: TUnitType,
    private _owner: TUnitOwner,
    public readonly game: Game<TCellType, TUnitType, TUnitOwner>,
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

  public get lastMove(): [Cell<TCellType, TUnitType, TUnitOwner> | undefined, Cell<TCellType, TUnitType, TUnitOwner>] {
    return [this._prevCell, this._cell];
  }

  public changeType(type: TUnitType): void {
    this._type = type;
  }

  public get cell(): Cell<TCellType, TUnitType, TUnitOwner> {
    return this._cell;
  }

  public set cell(cell: Cell<TCellType, TUnitType, TUnitOwner>) {
    // TODO Add Pathfinder for smooth and correct animations
    this._prevCell = this._cell;
    this._cell = cell;
  }

  public changeOwner(owner: TUnitOwner): void {
    this._owner = owner;
  }

  public get owner(): TUnitOwner {
    return this._owner;
  }
}
