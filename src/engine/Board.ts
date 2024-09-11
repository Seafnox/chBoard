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
  private readonly cellMap: Record<string, Cell<TCellType, TUnitType, TUnitOwner> | undefined>;

  public units: Unit<TCellType, TUnitType, TUnitOwner>[];
  private readonly unitMap: Record<string, Unit<TCellType, TUnitType, TUnitOwner> | undefined>;

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
  }

  getCellXY(x: number, y: number): Cell<TCellType, TUnitType, TUnitOwner> | undefined {
    return this.cellMap[`${x},${y}`];
  }

  getCell(vector: Vector2d): Cell<TCellType, TUnitType, TUnitOwner> | undefined {
    return this.getCellXY(vector.x, vector.y);
  }

  getUnitXY(x: number, y: number): Unit<TCellType, TUnitType, TUnitOwner> | undefined {
    return this.unitMap[`${x},${y}`];
  }

  getUnit(vector: Vector2d): Unit<TCellType, TUnitType, TUnitOwner> | undefined {
    return this.getUnitXY(vector.x, vector.y);
  }

  moveUnit(action: MovingActionChange<Unit<TCellType, TUnitType, TUnitOwner>>): void {
    const nextPosition = action.to;
    const unit = action.entity;
    const from = unit.cell;
    const to = this.getCellXY(nextPosition.x, nextPosition.y);

    if (!to) {
      throw new Error(`Unit [${unit.position}] can not move to next cell [${nextPosition}]. Reason: No next cell`);
    }

    unit.cell = to;
    this.unitMap[`${from.position.x},${from.position.y}`] = undefined;
    this.unitMap[`${to.position.x},${to.position.y}`] = unit;
    this.game.gameLog.push(action);
  }

  removeUnit(action: RemovingActionChange<Unit<TCellType, TUnitType, TUnitOwner>>): void {
    const target = action.target;
    target.isDead = true;
    this.unitMap[`${target.position.x},${target.position.y}`] = undefined;
    this.units = this.units.filter(currentUnit => currentUnit !== target);
    this.game.gameLog.push(action);
  }

  updateUnit(actionChange: ChangingActionChange<Unit<TCellType, TUnitType, TUnitOwner>>) {
    actionChange.update(actionChange.target);
    // FIXME stupid typescript. Unit is not InteractiveEntity, but extends InteractiveEntity.
    this.game.gameLog.push(actionChange as ChangingActionChange<any>);
  }
}
