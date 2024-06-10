import { Board } from './Board';
import { BoardConfig } from './BoardConfig';
import { InteractiveEntity } from './InteractiveEntity';
import { Rule } from './Rule';

export class Game<TCellType, TUnitType, TOwner> {
  private board: Board<TCellType, TUnitType, TOwner>;

  constructor(
    public readonly width: number,
    public readonly height: number,
    public readonly initialConfig: BoardConfig<TCellType, TUnitType, TOwner>,
    private rules: Rule<TCellType, TUnitType, TOwner, InteractiveEntity<TCellType, TUnitType, TOwner>>[],
  ) {
    this.board = new Board(width, height, initialConfig);

    const interactiveEntities: InteractiveEntity<TCellType, TUnitType, TOwner>[] = [];
    interactiveEntities.push(this.board);
    interactiveEntities.push(...this.board.cells);
    interactiveEntities.push(...this.board.units);

    this.rules.forEach(rule => {
      interactiveEntities.forEach(interactiveEntity => {
        if (rule.isSuitable(interactiveEntity)) {
          interactiveEntity.addAction(rule.getAction(interactiveEntity, this.board));
        }
      })
    })
  }
}
