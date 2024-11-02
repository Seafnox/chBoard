import { Enumerable } from '../engine/Enumerable';
import {ActionChange} from "../engine/actionChanges/ActionChange";
import {UnitDto} from "../engine/dto/UnitDto";
import {BoardDto} from "../engine/dto/BoardDto";

export interface PlayerGameClient<TCellType extends Enumerable, TUnitType extends Enumerable, TUnitOwner extends Enumerable> {
  onActionChange: (actions: ActionChange[]) => void; // TODO call this after new action
  onSetActiveOwner: (owner: TUnitOwner) => void; // TODO call this after new action
  onCreateBoard: (boardData: BoardDto<TCellType, TUnitType, TUnitOwner>) => void; // TODO call this after start game
  onCreateUnit: (unitData: UnitDto<TUnitType, TUnitOwner>) => void; // TODO call this after start game
  onUpdateUnit: (unitData: UnitDto<TUnitType, TUnitOwner>) => void; // TODO call this after new action
  onEndGame: (winner: string) => void; // TODO call this after new action
}
