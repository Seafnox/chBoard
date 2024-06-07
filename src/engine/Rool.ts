import { AvailableAction } from './AvailableAction';
import { Board } from './Board';
import { InteractiveEntity } from './InteractiveEntity';

export abstract class Rool<TCellType, TUnitType> {
  abstract isSuitable(entity: InteractiveEntity<TCellType, TUnitType>): boolean;
  abstract getAction(
    entity: InteractiveEntity<TCellType, TUnitType>,
    board: Board<TCellType, TUnitType>,
  ): AvailableAction<TCellType, TUnitType>[];
}
