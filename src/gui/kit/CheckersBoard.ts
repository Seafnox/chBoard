import { ScreenElement, Rectangle, GraphicsGroup, Color, vec, Text, Vector, BaseAlign, TextAlign } from 'excalibur';
import { GraphicsGrouping } from 'excalibur/build/dist/Graphics/GraphicsGroup';
import { GameConfig } from '../../engine/GameConfig';
import { PixelFont30px } from '../PrepareFonts';

const cellSize = 60;
const borderSize = 50;
const borderBorderCoef = 0.1;
const graphicState = 'root';
const lightColor = Color.fromHex('DBC1A2');
const darkColor = Color.fromHex('4F3B2C');

export class CheckersBoard extends ScreenElement {

  constructor(
    public readonly initialConfig: GameConfig<unknown, unknown, unknown>,
    offset: Vector,
  ) {
    super({
      width: cellSize * initialConfig.width + borderSize * 2,
      height: cellSize * initialConfig.height + borderSize * 2,
      offset,
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
          graphic: this.getHorizontalBorder(initialConfig, true),
          offset: vec(-this.offset.x / 2, 0),
        },
        {
          graphic: this.getVerticalBorder(initialConfig, true),
          offset: vec(-this.offset.x / 2, 0),
        },
        {
          graphic: this.getHorizontalBorder(initialConfig),
          offset: vec(-this.offset.x / 2, initialConfig.height * cellSize + borderSize),
        },
        {
          graphic: this.getVerticalBorder(initialConfig),
          offset: vec(initialConfig.width * cellSize + borderSize - this.offset.x / 2, 0),
        },
        {
          graphic: this.getCells(initialConfig),
          offset: vec(borderSize - this.offset.x / 2, borderSize * 100),
        },
      ],
    });
  }

  private getVerticalBorder(
    initialConfig: GameConfig<unknown, unknown, unknown>,
    isLeftBorder = false,
  ): GraphicsGroup {
    return new GraphicsGroup({
      members: [
        {
          graphic: new Rectangle({
            width: borderSize,
            height: initialConfig.height * cellSize + borderSize * 2 * (1 - borderBorderCoef),
            color: lightColor,
          }),
          offset: vec(0, borderSize * borderBorderCoef),
        },
        {
          graphic: new Rectangle({
            width: borderSize * borderBorderCoef,
            height: initialConfig.height * cellSize + borderSize * 2,
            color: darkColor,
          }),
          offset: vec(isLeftBorder ? 0 : borderSize * (1 - borderBorderCoef), 0),
        },
        {
          graphic: new Rectangle({
            width: borderSize * borderBorderCoef,
            height: initialConfig.height * cellSize + borderSize * 2 * borderBorderCoef,
            color: darkColor,
          }),
          offset: vec(isLeftBorder ? borderSize * (1 - borderBorderCoef) : 0, borderSize * (1 - borderBorderCoef)),
        },
        {
          graphic: this.getVerticalBorderNumbers(initialConfig),
          offset: vec(borderSize, 0),
        },
      ],
    });
  }

  private getVerticalBorderNumbers(initialConfig: GameConfig<unknown, unknown, unknown>): GraphicsGroup {
    return new GraphicsGroup({
      members: Array(initialConfig.width).fill(0).map<GraphicsGrouping>((_, index) => ({
        graphic: new Text({
          width: borderSize,
          height: borderSize,
          text: String(index + 1),
          color: darkColor,
          font: PixelFont30px({
            textAlign: TextAlign.Center,
            baseAlign: BaseAlign.Middle,
          }),
        }),
        offset: vec(index * cellSize + borderSize / 2, borderSize / 2),
      })),
    });
  }

  private getHorizontalBorder(
    initialConfig: GameConfig<unknown, unknown, unknown>,
    isTopBorder = false,
  ): GraphicsGroup {
    return new GraphicsGroup({
      members: [
        {
          graphic: new Rectangle({
            width: initialConfig.width * cellSize + borderSize * 2 * (1 - borderBorderCoef),
            height: borderSize,
            color: lightColor,
          }),
          offset: vec(borderSize * borderBorderCoef, 0),
        },
        {
          graphic: new Rectangle({
            width: initialConfig.width * cellSize + borderSize * 2,
            height: borderSize * borderBorderCoef,
            color: darkColor,
          }),
          offset: vec(0, isTopBorder ? 0 : borderSize * (1 - borderBorderCoef)),
        },
        {
          graphic: new Rectangle({
            width: initialConfig.width * cellSize + borderSize * 2 * borderBorderCoef,
            height: borderSize * borderBorderCoef,
            color: darkColor,
          }),
          offset: vec(borderSize * (1 - borderBorderCoef), isTopBorder ? borderSize * (1 - borderBorderCoef) : 0),
        },
        {
          graphic: this.getHorizontalBorderLetters(initialConfig),
          offset: vec(-borderSize/2, borderSize),
        },
      ],
    });
  }

  private getHorizontalBorderLetters(initialConfig: GameConfig<unknown, unknown, unknown>): GraphicsGroup {
    const firstCharIndex = 'A'.charCodeAt(0);
    return new GraphicsGroup({
      members: [
        ...Array(initialConfig.width).fill(0).map<GraphicsGrouping>((_, index) => ({
          graphic: new Rectangle({
            width: borderSize / 2,
            height: borderSize / 2,
            color: Color.Cyan,
          }),
          offset: vec(borderSize / 4, index * cellSize + borderSize / 4),
        })),
        ...Array(initialConfig.height).fill(0).map<GraphicsGrouping>((_, index) => ({
          graphic: new Text({
            width: borderSize,
            height: borderSize,
            text: String.fromCharCode(firstCharIndex + index),
            color: darkColor,
            font: PixelFont30px({
              textAlign: TextAlign.Center,
              baseAlign: BaseAlign.Middle,
            }),
          }),
          offset: vec(borderSize / 2, index * cellSize + borderSize / 2),
        })),
      ],
    });
  }

  private getCells(initialConfig: GameConfig<unknown, unknown, unknown>): GraphicsGroup {
    const cellMembers: GraphicsGrouping[] = [];
    for (let y = 0; y < initialConfig.height; y++) {
      for (let x = 0; x < initialConfig.width; x++) {
        cellMembers.push({
          graphic: new Rectangle({
            width: cellSize,
            height: cellSize,
            color: (x + y) % 2 === 0 ? lightColor : darkColor,
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
