import { ScreenElement, Rectangle, GraphicsGroup, Color, vec, Text } from 'excalibur';
import { GraphicsGrouping } from 'excalibur/build/dist/Graphics/GraphicsGroup';
import { GameConfig } from '../../engine/GameConfig';
import { PixelFont30px } from '../PrepareFonts';

const cellSize = 50;
const borderSize = 30;
const graphicState = 'root';
const lightColor = Color.fromHex('DBC1A2');
const darkColor = Color.fromHex('4F3B2C');

export class CheckersBoard extends ScreenElement {

  constructor(
    public readonly initialConfig: GameConfig<unknown, unknown, unknown>,
  ) {
    super({
      width: cellSize * initialConfig.width + borderSize * 2,
      height: cellSize * initialConfig.height + borderSize * 2,
    });

    this.graphics.add(graphicState, this.getStateGroup(initialConfig));
  }

  onInitialize() {
    this.graphics.use(graphicState);
  }

  private getStateGroup(initialConfig: GameConfig<unknown, unknown, unknown>) {
    return new GraphicsGroup({
      members: [
        {
          graphic: this.getHorizontalBorder(initialConfig),
          offset: vec(borderSize, borderSize),
        },
        {
          graphic: this.getVerticalBorder(initialConfig),
          offset: vec(borderSize, borderSize),
        },
        {
          graphic: this.getHorizontalBorder(initialConfig),
          offset: vec(borderSize, borderSize + initialConfig.height * cellSize),
        },
        {
          graphic: this.getVerticalBorder(initialConfig),
          offset: vec(borderSize + initialConfig.width * cellSize, borderSize),
        },
        {
          graphic: this.getCells(initialConfig),
          offset: vec(borderSize, borderSize),
        },
      ],
    });
  }

  private getVerticalBorder(initialConfig: GameConfig<unknown, unknown, unknown>): GraphicsGroup {
    return new GraphicsGroup({
      members: [
        {
          graphic: new Rectangle({
            width: borderSize,
            height: initialConfig.height * cellSize + borderSize * 2,
            color: lightColor,
          }),
          offset: vec(0, 0),
        },
        {
          graphic: new Rectangle({
            width: borderSize / 10,
            height: initialConfig.height * cellSize + borderSize * 2,
            color: darkColor,
          }),
          offset: vec(borderSize, borderSize),
        },
        ...this.getVerticalBorderNumbers(initialConfig),
      ],
    });
  }

  private getVerticalBorderNumbers(initialConfig: GameConfig<unknown, unknown, unknown>): GraphicsGrouping[] {
    return Array(initialConfig.width).fill(0).map<GraphicsGrouping>((_, index) => ({
      graphic: new Text({
        text: String(index + 1),
        color: darkColor,
        font: PixelFont30px(),
      }),
      offset: vec(index * cellSize + borderSize, borderSize),
    }));
  }

  private getHorizontalBorder(initialConfig: GameConfig<unknown, unknown, unknown>): GraphicsGroup {
    return new GraphicsGroup({
      members: [
        {
          graphic: new Rectangle({
            width: initialConfig.width * cellSize + borderSize * 2,
            height: borderSize,
            color: lightColor,
          }),
          offset: vec(0, 0),
        },
        {
          graphic: new Rectangle({
            width: initialConfig.width * cellSize + borderSize * 2,
            height: borderSize / 10,
            color: darkColor,
          }),
          offset: vec(borderSize, borderSize),
        },
        ...this.getHorizontalBorderLetters(initialConfig),
      ],
    });
  }

  private getHorizontalBorderLetters(initialConfig: GameConfig<unknown, unknown, unknown>): GraphicsGrouping[] {
    const firstCharIndex = 'A'.charCodeAt(0);
    return Array(initialConfig.height).fill(0).map<GraphicsGrouping>((_, index) => ({
      graphic: new Text({
        text: String.fromCharCode(firstCharIndex + index),
        color: darkColor,
        font: PixelFont30px(),
      }),
      offset: vec(borderSize, index * cellSize + borderSize),
    }));
  }

  private getCells(initialConfig: GameConfig<unknown, unknown, unknown>): GraphicsGroup {
    return new GraphicsGroup({
      members: Array(initialConfig.width * initialConfig.height).fill(0).map<GraphicsGrouping>((_, index) => ({
        graphic: new Rectangle({
          width: cellSize,
          height: cellSize,
          color: initialConfig.cellMap[index] === 'light' ? lightColor : darkColor,
        }),
        offset: vec((index % initialConfig.width) * cellSize + borderSize, Math.floor(index / initialConfig.width) * cellSize + borderSize),
      })),
    });
  }
}
