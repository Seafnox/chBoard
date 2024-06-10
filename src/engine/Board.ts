import { BoardConfig } from './BoardConfig';
import { Cell } from './Cell';
import { InteractiveEntity } from './InteractiveEntity';
import { Unit } from './Unit';

export class Board<TCellType, TUnitType, TOwner> extends InteractiveEntity<TCellType, TUnitType, TOwner> {
  public readonly cells: Cell<TCellType, TUnitType, TOwner>[];
  private readonly cellMap: Record<string, Cell<TCellType, TUnitType, TOwner>>;

  public readonly units: Unit<TCellType, TUnitType, TOwner>[];
  private readonly unitMap: Record<string, Unit<TCellType, TUnitType, TOwner>>;

  constructor(
    public readonly width: number,
    public readonly height: number,
    public readonly initialConfig: BoardConfig<TCellType, TUnitType, TOwner>,
  ) {
    super();

    this.cells = Array<Cell<TCellType, TUnitType, TOwner>>(width * height);
    this.cellMap = {};

    this.units = [];
    this.unitMap = {};

    Object.keys(initialConfig.cellMap).forEach(location => {
      const cellType = initialConfig.cellMap[location];
      const [x, y] = location.split(',').map(Number);
      const cell = new Cell<TCellType, TUnitType, TOwner>(x, y, cellType);
      this.cells[y * width + x] = cell;
      this.cellMap[location] = cell;
    });

    Object.keys(initialConfig.unitMap).forEach(location => {
      const { type, owner } = initialConfig.unitMap[location];
      const [x, y] = location.split(',').map(Number);
      const cell = this.cellMap[location];
      if (!cell) {
        throw new Error(`initialConfig incorrect. Could not find cell at [${x},${y}] for unit ${location}`);
      }
      const unit = new Unit<TCellType, TUnitType, TOwner>(x, y, type, owner);
      this.units.push(unit);
      this.unitMap[location] = unit;
    });
  }

  public getCell(x: number, y: number): Cell<TCellType, TUnitType, TOwner> {
    return this.cellMap[`${x},${y}`];
  }
}
