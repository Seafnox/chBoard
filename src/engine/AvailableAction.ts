import { Board } from './Board';
import { InteractiveEntity } from './InteractiveEntity';

export abstract class AvailableAction<TCellType, TUnitType> {
  constructor(
    public readonly entity: InteractiveEntity<TCellType, TUnitType>,
    public readonly board: Board<TCellType, TUnitType>,
  ) {}

  abstract get priority(): boolean;
  abstract get isActive(): boolean;

  public abstract action(): void
}
