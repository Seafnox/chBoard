import { ChangeActionChange } from './actionChanges/ChangeActionChange';
import { MoveActionChange } from './actionChanges/MoveActionChange';
import { RemoveActionChange } from './actionChanges/RemoveActionChange';
import { BoardConfig } from './BoardConfig';
import { Cell } from './Cell';
import { Game } from './Game';
import { InteractiveEntity } from './InteractiveEntity';
import { Enumerable } from './Enumerable';
import { Unit } from './Unit';
import { Vector2d } from './Vector2d';

export class Board<TCellType, TUnitType, TUnitOwner extends Enumerable> extends InteractiveEntity<TCellType, TUnitType, TUnitOwner> {
  public readonly cells: Cell<TCellType, TUnitType, TUnitOwner>[];
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

  public getCellXY(x: number, y: number): Cell<TCellType, TUnitType, TUnitOwner> | undefined {
    return this.cellMap[`${x},${y}`];
  }

  public getCell(vector: Vector2d): Cell<TCellType, TUnitType, TUnitOwner> | undefined {
    return this.getCellXY(vector.x, vector.y);
  }

  public getUnitXY(x: number, y: number): Unit<TCellType, TUnitType, TUnitOwner> | undefined {
    return this.unitMap[`${x},${y}`];
  }

  public getUnit(vector: Vector2d): Unit<TCellType, TUnitType, TUnitOwner> | undefined {
    return this.getUnitXY(vector.x, vector.y);
  }

  public moveUnit(unit: Unit<TCellType, TUnitType, TUnitOwner>, action: MoveActionChange<Unit<TCellType, TUnitType, TUnitOwner>>): void {
    const nextPosition = unit.position.add(action.to);
    const to = this.getCellXY(nextPosition.x, nextPosition.y);

    if (!to) {
      throw new Error(`Unit [${unit.position}] can not move to next cell [${nextPosition}]. Reason: No next cell`);
    }

    unit.setCell(to);
    this.unitMap[`${unit.position.x},${unit.position.y}`] = undefined;
    this.unitMap[`${to.position.x},${to.position.y}`] = unit;
    this.game.gameLog.push(action);
  }

  removeUnit(unit: Unit<TCellType, TUnitType, TUnitOwner>, action: RemoveActionChange<Unit<TCellType, TUnitType, TUnitOwner>>): void {
    unit.isDead = true;
    this.unitMap[`${unit.position.x},${unit.position.y}`] = undefined;
    this.units = this.units.filter(currentUnit => currentUnit !== unit);
    this.game.gameLog.push(action);
  }

  updateUnit(target: Unit<TCellType, TUnitType, TUnitOwner>, actionChange: ChangeActionChange<InteractiveEntity<TCellType, TUnitType, TUnitOwner>>) {
    actionChange.update(target);
    this.game.gameLog.push(actionChange);
  }
}
