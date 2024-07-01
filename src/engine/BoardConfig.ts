export interface UnitConfig<TUnitType, TOwner> {
  type: TUnitType,
  owner: TOwner,
}

export interface BoardConfig<TCellType, TUnitType, TOwner> {
  width: number,
  height: number,
  cellMap: Record<string, TCellType>,
  unitMap: Record<string, UnitConfig<TUnitType, TOwner>>,
}
