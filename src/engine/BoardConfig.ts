import { Enumerable } from './Enumerable';

export interface UnitConfig<TUnitType, TUnitOwner extends Enumerable> {
  type: TUnitType,
  owner: TUnitOwner,
}

export interface BoardConfig<TCellType, TUnitType, TUnitOwner extends Enumerable> {
  width: number,
  height: number,
  cellMap: Record<string, TCellType>,
  unitMap: Record<string, UnitConfig<TUnitType, TUnitOwner>>,
}
