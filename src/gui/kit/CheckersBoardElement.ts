import { ScreenElement, Rectangle, GraphicsGroup, vec, Text, Vector } from 'excalibur';
import { GraphicsGrouping } from 'excalibur/build/dist/Graphics/GraphicsGroup';
import { Enumerable } from '../../engine/Enumerable';
import { GameConfig } from '../../engine/GameConfig';
import { borderFont, darkBoardColor, lightBoardColor, graphicState, borderBorderCoef, borderSize, cellSize } from './CheckersConstants';

export class CheckersBoardElement<TCellType extends Enumerable, TUnitType extends Enumerable, TUnitOwner extends Enumerable> extends ScreenElement {

  constructor(
    public readonly initialConfig: GameConfig<TCellType, TUnitType, TUnitOwner>,
    public readonly position: Vector,
  ) {
    super({
      width: cellSize * initialConfig.width + borderSize * 2,
      height: cellSize * initialConfig.height + borderSize * 2,
      pos: position,
    });

    this.graphics.add(graphicState, this.getStateGroup(initialConfig));
  }

  onInitialize() {
    this.graphics.use(graphicState);
  }

  private getStateGroup(initialConfig: GameConfig<TCellType, TUnitType, TUnitOwner>) {
    const offsetX = (2 * borderSize + initialConfig.width * cellSize) / 2;
    return new GraphicsGroup({
      members: [
        {
          graphic: this.getVerticalBorder(initialConfig, true),
          offset: vec(- offsetX, 0),
        },
        {
          graphic: this.getHorizontalBorder(initialConfig, true),
          offset: vec(- offsetX, 0),
        },
        {
          graphic: this.getHorizontalBorder(initialConfig),
          offset: vec(- offsetX, initialConfig.height * cellSize + borderSize),
        },
        {
          graphic: this.getVerticalBorder(initialConfig),
          offset: vec(initialConfig.width * cellSize + borderSize - offsetX, 0),
        },
        {
          graphic: this.getVerticalBorderNumbers(initialConfig),
          offset: vec(borderSize - offsetX, 0),
        },
        {
          graphic: this.getVerticalBorderNumbers(initialConfig),
          offset: vec(borderSize - offsetX, initialConfig.width * cellSize + borderSize),
        },
        {
          graphic: this.getHorizontalBorderLetters(initialConfig),
          offset: vec(- offsetX, borderSize),
        },
        {
          graphic: this.getHorizontalBorderLetters(initialConfig),
          offset: vec(initialConfig.height * cellSize + borderSize - offsetX, borderSize),
        },
        {
          graphic: this.getCells(initialConfig),
          offset: vec(borderSize - offsetX, borderSize),
        },
      ],
    });
  }

  private getVerticalBorder(
    initialConfig: GameConfig<TCellType, TUnitType, TUnitOwner>,
    isLeftBorder = false,
  ): GraphicsGroup {
    return new GraphicsGroup({
      members: [
        {
          graphic: new Rectangle({
            width: borderSize,
            height: initialConfig.height * cellSize + borderSize * 2 * (1 - borderBorderCoef),
            color: lightBoardColor,
          }),
          offset: vec(0, borderSize * borderBorderCoef),
        },
        {
          graphic: new Rectangle({
            width: borderSize * borderBorderCoef,
            height: initialConfig.height * cellSize + borderSize * 2,
            color: darkBoardColor,
          }),
          offset: vec(isLeftBorder ? 0 : borderSize * (1 - borderBorderCoef), 0),
        },
        {
          graphic: new Rectangle({
            width: borderSize * borderBorderCoef,
            height: initialConfig.height * cellSize + borderSize * 2 * borderBorderCoef,
            color: darkBoardColor,
          }),
          offset: vec(isLeftBorder ? borderSize * (1 - borderBorderCoef) : 0, borderSize * (1 - borderBorderCoef)),
        },
      ],
    });
  }

  private getVerticalBorderNumbers(initialConfig: GameConfig<TCellType, TUnitType, TUnitOwner>): GraphicsGroup {
    return new GraphicsGroup({
      members: Array(initialConfig.width).fill(0).map<GraphicsGrouping>((_, index) => ({
        graphic: new Text({
          width: borderSize,
          height: borderSize,
          text: String(index + 1),
          color: darkBoardColor,
          font: borderFont,
        }),
        offset: vec(index * cellSize + borderSize, borderSize / 2),
      }))
    });
  }

  private getHorizontalBorder(
    initialConfig: GameConfig<TCellType, TUnitType, TUnitOwner>,
    isTopBorder = false,
  ): GraphicsGroup {
    return new GraphicsGroup({
      members: [
        {
          graphic: new Rectangle({
            width: initialConfig.width * cellSize + borderSize * 2 * (1 - borderBorderCoef),
            height: borderSize,
            color: lightBoardColor,
          }),
          offset: vec(borderSize * borderBorderCoef, 0),
        },
        {
          graphic: new Rectangle({
            width: initialConfig.width * cellSize + borderSize * 2,
            height: borderSize * borderBorderCoef,
            color: darkBoardColor,
          }),
          offset: vec(0, isTopBorder ? 0 : borderSize * (1 - borderBorderCoef)),
        },
        {
          graphic: new Rectangle({
            width: initialConfig.width * cellSize + borderSize * 2 * borderBorderCoef,
            height: borderSize * borderBorderCoef,
            color: darkBoardColor,
          }),
          offset: vec(borderSize * (1 - borderBorderCoef), isTopBorder ? borderSize * (1 - borderBorderCoef) : 0),
        },
      ],
    });
  }

  private getHorizontalBorderLetters(initialConfig: GameConfig<TCellType, TUnitType, TUnitOwner>): GraphicsGroup {
    const firstCharIndex = 'A'.charCodeAt(0);
    return new GraphicsGroup({
      members: Array(initialConfig.height).fill(0).map<GraphicsGrouping>((_, index) => ({
        graphic: new Text({
          width: borderSize,
          height: borderSize,
          text: String.fromCharCode(firstCharIndex + index),
          color: darkBoardColor,
          font: borderFont,
        }),
        offset: vec(borderSize / 2, index * cellSize + borderSize),
      })),
    });
  }

  private getCells(initialConfig: GameConfig<TCellType, TUnitType, TUnitOwner>): GraphicsGroup {
    const cellMembers: GraphicsGrouping[] = [];
    for (let y = 0; y < initialConfig.height; y++) {
      for (let x = 0; x < initialConfig.width; x++) {
        cellMembers.push({
          graphic: new Rectangle({
            width: cellSize,
            height: cellSize,
            color: (x + y) % 2 === 0 ? lightBoardColor : darkBoardColor,
          }),
          offset: vec(x * cellSize, y * cellSize),
        });
      }
    }
    return new GraphicsGroup({
      members: cellMembers,
    });
  }
}
