import {Enumerable} from "../Enumerable";
import {ActionDto} from "./ActionDto";

export interface UnitDto<TUnitType extends Enumerable, TUnitOwner extends Enumerable> {
  id: string;
  type: TUnitType;
  owner: TUnitOwner;
  isDead: boolean;
  isActive: boolean;
  actions: ActionDto[];
  x: number;
  y: number;
}
