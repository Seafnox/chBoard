import { AvailableAction } from './AvailableAction';
import { Board } from './Board';
import { InteractiveEntity } from './InteractiveEntity';

export abstract class Rule<TCellType, TUnitType, TInteractiveEntity extends InteractiveEntity<TCellType, TUnitType>> {
  abstract isSuitable(entity: InteractiveEntity<TCellType, TUnitType>): entity is TInteractiveEntity;
  abstract getAction(
    entity: TInteractiveEntity,
    board: Board<TCellType, TUnitType>,
  ): AvailableAction<TCellType, TUnitType, TInteractiveEntity>[];
}
