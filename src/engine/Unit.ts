import { getId } from '../utils/getId';
import { Cell } from './Cell';
import { Enumerable } from './Enumerable';
import { Game } from './Game';
import { InteractiveEntity } from './InteractiveEntity';
import { Vector2d } from './Vector2d';

export class Unit<TCellType extends Enumerable, TUnitType extends Enumerable, TUnitOwner extends Enumerable> extends InteractiveEntity<TCellType, TUnitType, TUnitOwner> {
  public id = getId();
  public isDead = false;
  private _prevCell?: Cell<TCellType, TUnitType, TUnitOwner>;

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

  public set type(type: TUnitType) {
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

  public get owner(): TUnitOwner {
    return this._owner;
  }

  public set owner(owner: TUnitOwner) {
    this._owner = owner;
  }

  copy(unit: Unit<TCellType, TUnitType, TUnitOwner>): Unit<TCellType, TUnitType, TUnitOwner> {
    const {id, type, isDead, owner} = unit;

    this.id = `${id}_${this.id}`;
    this._type = type;
    this.isDead = isDead;
    this._owner = owner;

    const [prevCell, currentCell] = unit.lastMove;

    if (!!prevCell) {
      const cell = this.game.board.getCell(prevCell.position)!;
      this._prevCell = cell;
    }

    if (!!currentCell) {
      const cell = this.game.board.getCell(currentCell.position)!;
      this._cell = cell;
    }

    return this;

  }
}
