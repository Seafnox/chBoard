import { BoardConfig } from './BoardConfig';
import { Cell } from './Cell';
import { InteractiveEntity } from './InteractiveEntity';
import { Unit } from './Unit';

export class Board<TCellType, TUnitType> extends InteractiveEntity<TCellType, TUnitType> {
  public readonly cells: Cell<TCellType, TUnitType>[];
  private readonly cellMap: Record<string, Cell<TCellType, TUnitType>>;

  public readonly units: Unit<TCellType, TUnitType>[];
  private readonly unitMap: Record<string, Unit<TCellType, TUnitType>>;

  constructor(
    public readonly width: number,
    public readonly height: number,
    public readonly initialConfig: BoardConfig<TCellType, TUnitType>,
  ) {
    super();

    this.cells = Array<Cell<TCellType, TUnitType>>(width * height);
    this.cellMap = {};

    this.units = [];
    this.unitMap = {};

    Object.keys(initialConfig.cellMap).forEach(location => {
      const cellType = initialConfig.cellMap[location];
      const [x, y] = location.split(',').map(Number);
      const cell = new Cell<TCellType, TUnitType>(x, y, cellType);
      this.cells[y * width + x] = cell;
      this.cellMap[location] = cell;
    });

    Object.keys(initialConfig.unitMap).forEach(location => {
      const unitType = initialConfig.unitMap[location];
      const [x, y] = location.split(',').map(Number);
      const cell = this.cellMap[location];
      if (!cell) {
        throw new Error(`initialConfig incorrect. Could not find cell at [${x},${y}] for unit ${location}`);
      }
      const unit = new Unit<TCellType, TUnitType>(x, y, unitType);
      this.units.push(unit);
      this.unitMap[location] = unit;
    });
  }

  public getCell(x: number, y: number): Cell<TCellType, TUnitType> {
    return this.cellMap[`${x},${y}`];
  }
}
