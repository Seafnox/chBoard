export interface BoardConfig<TCellType, TUnitType> {
  cellMap: Record<string, TCellType>,
  unitMap: Record<string, TUnitType>,
}
