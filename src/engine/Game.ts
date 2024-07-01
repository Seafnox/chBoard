import { Board } from './Board';
import { GameConfig } from './GameConfig';
import { InteractiveEntity } from './InteractiveEntity';

export class Game<TCellType, TUnitType, TOwner> {
  private board: Board<TCellType, TUnitType, TOwner>;

  constructor(
    public readonly initialConfig: GameConfig<TCellType, TUnitType, TOwner>,
  ) {
    this.board = new Board(initialConfig);

    const interactiveEntities: InteractiveEntity<TCellType, TUnitType, TOwner>[] = [];
    interactiveEntities.push(this.board);
    interactiveEntities.push(...this.board.cells);
    interactiveEntities.push(...this.board.units);

    this.initialConfig.rules.forEach(rule => {
      interactiveEntities.forEach(interactiveEntity => {
        if (rule.isSuitable(interactiveEntity)) {
          interactiveEntity.addAction(rule.getAction(interactiveEntity, this.board));
        }
      })
    })
  }
}
