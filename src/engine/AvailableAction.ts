import { Board } from './Board';
import { InteractiveEntity } from './InteractiveEntity';

export abstract class AvailableAction<TCellType, TUnitType, TInteractiveEntity extends InteractiveEntity<TCellType, TUnitType>> {
  constructor(
    public readonly entity: TInteractiveEntity,
    public readonly board: Board<TCellType, TUnitType>,
  ) {}

  abstract get priority(): number;
  abstract get isActive(): boolean;

  public abstract action(): void
}
