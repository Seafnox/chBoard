import { Action } from './Action';
import { Enumerable } from './Enumerable';
import { Game } from './Game';
import { InteractiveEntity } from './InteractiveEntity';

export abstract class Rule<TCellType, TUnitType, TUnitOwner extends Enumerable, TInteractiveEntity extends InteractiveEntity<TCellType, TUnitType, TUnitOwner>> {
  abstract isSuitable(entity: InteractiveEntity<TCellType, TUnitType, TUnitOwner>): entity is TInteractiveEntity;
  abstract getAction(
    entity: TInteractiveEntity,
    game: Game<TCellType, TUnitType, TUnitOwner>
  ): Action<TCellType, TUnitType, TUnitOwner, TInteractiveEntity>[];
}
