import {BoardConfig} from "../BoardConfig";
import {Enumerable} from "../Enumerable";

export type BoardDto<
  TCellType extends Enumerable,
  TUnitType extends Enumerable,
  TUnitOwner extends Enumerable
> = BoardConfig<TCellType, TUnitType, TUnitOwner>;
