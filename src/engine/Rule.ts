import { Action } from './Action';
import { Enumerable } from './Enumerable';
import { Game } from './Game';
import { InteractiveEntity } from './InteractiveEntity';

export abstract class Rule<TCellType extends Enumerable, TUnitType extends Enumerable, TUnitOwner extends Enumerable, TInteractiveEntity extends InteractiveEntity<TCellType, TUnitType, TUnitOwner>> {
  abstract isSuitable(entity: InteractiveEntity<TCellType, TUnitType, TUnitOwner>): entity is TInteractiveEntity;
  abstract getActions(
    game: Game<TCellType, TUnitType, TUnitOwner>,
    entity: TInteractiveEntity,
  ): Action<TCellType, TUnitType, TUnitOwner, TInteractiveEntity>[];
}
