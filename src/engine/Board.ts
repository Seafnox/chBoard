import { Cell } from './Cell';
import { InteractiveEntity } from './InteractiveEntity';

export class Board<TCellType, TUnitType> extends InteractiveEntity<TCellType, TUnitType> {
  private readonly cells: Cell<TCellType, TUnitType>[];
  private readonly cellMap: Record<string, Cell<TCellType, TUnitType>>;

  constructor(
    public readonly width: number,
    public readonly height: number,
    public readonly defaultCellType: TCellType,
  ) {
    super();

    this.cells = Array<Cell<TCellType, TUnitType>>(width * height);
    this.cellMap = {};
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const cell = new Cell<TCellType, TUnitType>(x, y, defaultCellType);
        this.cells[x * this.width + y] = cell;
        this.cellMap[`${x},${y}`] = cell;
      }
    }
  }

  public getCell(x: number, y: number): Cell<TCellType, TUnitType> {
    return this.cellMap[`${x},${y}`];
  }
}
