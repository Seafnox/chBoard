import { Board } from './Board';
import { Rool } from './Rool';

export class Game<TCellType, TUnitType> {
  public readonly board: Board<TCellType, TUnitType>;
  constructor(
    public readonly width: number,
    public readonly height: number,
    public readonly defaultCellType: TCellType,
    private rools: Rool<TCellType, TUnitType>[],
  ) {
    this.board = new Board(width, height, defaultCellType);
  }
}
