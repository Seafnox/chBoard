import { CommonActionChange } from './actionChanges/CommonActionChange';
import { Board } from './Board';

export abstract class Action<TCellType, TUnitType, TOwner, TInteractiveEntity> {
  constructor(
    public readonly entity: TInteractiveEntity,
    public readonly board: Board<TCellType, TUnitType, TOwner>,
  ) {}

  abstract get priority(): number;
  abstract get isActive(): boolean;

  abstract get changes(): CommonActionChange<TInteractiveEntity>[];

  public abstract run(): void;
}
