import { AvailableAction } from './AvailableAction';
import { Board } from './Board';
import { InteractiveEntity } from './InteractiveEntity';

export abstract class Rule<TCellType, TUnitType, TOwner, TInteractiveEntity extends InteractiveEntity<TCellType, TUnitType, TOwner>> {
  abstract isSuitable(entity: InteractiveEntity<TCellType, TUnitType, TOwner>): entity is TInteractiveEntity;
  abstract getAction(
    entity: TInteractiveEntity,
    board: Board<TCellType, TUnitType, TOwner>,
  ): AvailableAction<TCellType, TUnitType, TOwner, TInteractiveEntity>[];
}
