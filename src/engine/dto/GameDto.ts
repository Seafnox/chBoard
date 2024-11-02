import {Enumerable} from "../Enumerable";
import {GameConfig} from "../GameConfig";

export type GameDto<
  TCellType extends Enumerable,
  TUnitType extends Enumerable,
  TUnitOwner extends Enumerable
> = GameConfig<TCellType, TUnitType, TUnitOwner>;
