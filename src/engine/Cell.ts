import { getId } from '../utils/getId';
import { Enumerable } from './Enumerable';
import { Game } from './Game';
import { InteractiveEntity } from './InteractiveEntity';
import { Vector2d } from './Vector2d';

export class Cell<TCellType extends Enumerable, TUnitType extends Enumerable, TUnitOwner extends Enumerable> extends InteractiveEntity<TCellType, TUnitType, TUnitOwner> {
  public id = getId();

  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly type: TCellType | undefined,
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

  copy(cell: Cell<TCellType, TUnitType, TUnitOwner>): Cell<TCellType, TUnitType, TUnitOwner> {
    const {id, x, y, type} = cell;

    this.id = `${id}_${this.id}`;

    Object.assign(this, {x, y, type});

    return this;
  }
}
