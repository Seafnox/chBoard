import { Action } from './Action';
import { EventEmitter } from './EventEmitter';
import { Game } from './Game';
import { InteractiveEntity } from './InteractiveEntity';

export abstract class Rule<TCellType, TUnitType, TOwner, TInteractiveEntity extends InteractiveEntity<TCellType, TUnitType, TOwner>> {
  abstract isSuitable(entity: InteractiveEntity<TCellType, TUnitType, TOwner>): entity is TInteractiveEntity;
  abstract getAction(
    entity: TInteractiveEntity,
    game: Game<TCellType, TUnitType, TOwner>,
    eventBus: EventEmitter,
  ): Action<TCellType, TUnitType, TOwner, TInteractiveEntity>[];
}
