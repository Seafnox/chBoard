import { ChangingActionChange } from './actionChanges/ChangingActionChange';
import { MovingActionChange } from './actionChanges/MovingActionChange';
import { RemovingActionChange } from './actionChanges/RemovingActionChange';
import { BoardConfig } from './BoardConfig';
import { Cell } from './Cell';
import { Game } from './Game';
import { InteractiveEntity } from './InteractiveEntity';
import { Enumerable } from './Enumerable';
import { Unit } from './Unit';
import { Vector2d } from './Vector2d';

export class Board<TCellType extends Enumerable, TUnitType extends Enumerable, TUnitOwner extends Enumerable> extends InteractiveEntity<TCellType, TUnitType, TUnitOwner> {
  public cells: Cell<TCellType, TUnitType, TUnitOwner>[];
  public units: Unit<TCellType, TUnitType, TUnitOwner>[];

  private notOnBoardCell = new Cell<TCellType, TUnitType, TUnitOwner>(NaN, NaN, undefined, this.game);
  private cellMap: Record<string, Cell<TCellType, TUnitType, TUnitOwner> | undefined>;
  private unitMap: Record<string, Unit<TCellType, TUnitType, TUnitOwner> | undefined>;
  private interactiveEntityMap: Record<string, InteractiveEntity<TCellType, TUnitType, TUnitOwner>> = {};


  constructor(
    public readonly initialConfig: BoardConfig<TCellType, TUnitType, TUnitOwner>,
    public readonly game: Game<TCellType, TUnitType, TUnitOwner>,
  ) {
    super();

    this.cells = Array<Cell<TCellType, TUnitType, TUnitOwner>>(this.initialConfig.width * this.initialConfig.height);
    this.cellMap = {};

    this.units = [];
    this.unitMap = {};

    Object.keys(initialConfig.cellMap).forEach(location => {
      const cellType = initialConfig.cellMap[location];
      const [x, y] = location.split(',').map(Number);
      const cell = new Cell<TCellType, TUnitType, TUnitOwner>(x, y, cellType, this.game);
      this.cells[y * this.initialConfig.width + x] = cell;
      this.cellMap[location] = cell;
    });

    Object.keys(initialConfig.unitMap).forEach(location => {
      const { type, owner } = initialConfig.unitMap[location];
      const [x, y] = location.split(',').map(Number);
      const cell = this.cellMap[location];
      if (!cell) {
        throw new Error(`initialConfig incorrect. Could not find cell at [${x},${y}] for unit ${location}`);
      }
      const unit = new Unit<TCellType, TUnitType, TUnitOwner>(cell, type, owner, this.game);
      this.units.push(unit);
      this.unitMap[location] = unit;
    });

    const interactiveEntities = [
      this,
      ...this.cells,
      ...this.units,
    ];

    this.interactiveEntityMap = interactiveEntities.reduce<Record<string, InteractiveEntity<TCellType, TUnitType, TUnitOwner>>>((map, entity) => {
      map[entity.id] = entity;
      return map;
    }, {});
  }

  get interactiveEntities(): InteractiveEntity<TCellType, TUnitType, TUnitOwner>[] {
    return Object.values(this.interactiveEntityMap);
  }

  getCellByXY(x: number, y: number): Cell<TCellType, TUnitType, TUnitOwner> | undefined {
    if (isNaN(x) || isNaN(y)) {
      return this.notOnBoardCell;
    }

    return this.cellMap[`${x},${y}`];
  }

  getCellById(id: string): Cell<TCellType, TUnitType, TUnitOwner> | undefined {
    if (!this.interactiveEntityMap[id]) {
      return;
    }

    if (!(this.interactiveEntityMap[id] instanceof Cell)) {
      return;
    }

    return this.interactiveEntityMap[id] as Cell<TCellType, TUnitType, TUnitOwner>;
  }

  getCell(vector: Vector2d): Cell<TCellType, TUnitType, TUnitOwner> | undefined {
    return this.getCellByXY(vector.x, vector.y);
  }

  getUnitByXY(x: number, y: number): Unit<TCellType, TUnitType, TUnitOwner> | undefined {
    return this.unitMap[`${x},${y}`];
  }

  getUnitById(id: string): Unit<TCellType, TUnitType, TUnitOwner> | undefined {
    if (!this.interactiveEntityMap[id]) {
      return;
    }

    if (!(this.interactiveEntityMap[id] instanceof Unit)) {
      return;
    }

    return this.interactiveEntityMap[id] as Unit<TCellType, TUnitType, TUnitOwner>;
  }

  getUnit(vector: Vector2d): Unit<TCellType, TUnitType, TUnitOwner> | undefined {
    return this.getUnitByXY(vector.x, vector.y);
  }

  moveUnit(action: MovingActionChange): void {
    const nextPosition = Vector2d.fromString(action.to);
    const unit = this.getUnitById(action.sourceId);

    if (!unit) {
      this.throwUnitNotFound(action.sourceId);
    }

    const from = unit.cell;
    const to = this.getCellByXY(nextPosition.x, nextPosition.y);

    if (!to) {
      throw new Error(`Unit [${unit.position}] can not move to next cell [${nextPosition}]. Reason: No next cell`);
    }

    unit.cell = to;
    this.unitMap[`${from.position.x},${from.position.y}`] = undefined;
    this.unitMap[`${to.position.x},${to.position.y}`] = unit;
    this.game.emit(action);
  }

  removeUnit(action: RemovingActionChange): void {
    const target = this.getUnitById(action.targetId);

    if (!target) {
      this.throwUnitNotFound(action.targetId);
    }

    this.unitMap[`${target.position.x},${target.position.y}`] = undefined;
    target.isDead = true;
    target.cell = this.notOnBoardCell;
    this.game.emit(action);
  }

  updateUnit(actionChange: ChangingActionChange) {
    actionChange.update(actionChange.targetId);
    // FIXME stupid typescript. Unit is not InteractiveEntity, but extends InteractiveEntity.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    this.game.emit(actionChange);
  }

  copy(board: Board<TCellType, TUnitType, TUnitOwner>): Board<TCellType, TUnitType, TUnitOwner> {
    const { cells, units } = board;

    const interactiveEntityMap: Record<string, InteractiveEntity<TCellType, TUnitType, TUnitOwner>> = {
      [this.id]: this,
    };

    const cellMap: Record<string, Cell<TCellType, TUnitType, TUnitOwner>> = {};
    cells.forEach((cell: Cell<TCellType, TUnitType, TUnitOwner>, index: number) => {
      this.cells[index].copy(cell);
      cellMap[`${cell.position.x},${cell.position.y}`] = this.cells[index];
      interactiveEntityMap[this.cells[index].id] = this.cells[index];
    });
    this.cellMap = cellMap;

    const unitMap: Record<string, Unit<TCellType, TUnitType, TUnitOwner>> = {};
    units.forEach((unit: Unit<TCellType, TUnitType, TUnitOwner>, index: number) => {
      this.units[index].copy(unit);
      unitMap[`${unit.position.x},${unit.position.y}`] = this.units[index];
      interactiveEntityMap[this.units[index].id] = this.units[index];
    });
    this.unitMap = unitMap;

    this.interactiveEntityMap = interactiveEntityMap;

    return this;
  }

  private throwUnitNotFound(unitId: string): never {
    const availableUnitIds = this.units.map(unit => unit.id);
    throw new Error(`Unit ${unitId} not found. Available is: ${availableUnitIds.join(', ')}`);
  }
}
