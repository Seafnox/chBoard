import { Board } from './Board';
import { InteractiveEntity } from './InteractiveEntity';

export abstract class AvailableAction<TCellType, TUnitType, TOwner, TInteractiveEntity extends InteractiveEntity<TCellType, TUnitType, TOwner>> {
  constructor(
    public readonly entity: TInteractiveEntity,
    public readonly board: Board<TCellType, TUnitType, TOwner>,
  ) {}

  abstract get priority(): number;
  abstract get isActive(): boolean;

  public abstract action(): void
}
