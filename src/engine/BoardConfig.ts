export interface BoardConfig<TCellType, TUnitType> {
  defaultCellType: TCellType,
  cellMap: Record<string, TCellType>,
  unitMap: Record<string, TUnitType>,
}
