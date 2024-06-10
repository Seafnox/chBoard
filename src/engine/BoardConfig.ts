export interface UnitConfig<TUnitType, TOwner> {
  type: TUnitType,
  owner: TOwner,
}

export interface BoardConfig<TCellType, TUnitType, TOwner> {
  cellMap: Record<string, TCellType>,
  unitMap: Record<string, UnitConfig<TUnitType, TOwner>>,
}
