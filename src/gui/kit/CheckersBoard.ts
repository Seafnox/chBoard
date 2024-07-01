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
    public readonly initialConfig: GameConfig<any, any, any>,
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

  private getStateGroup(initialConfig: GameConfig<any, any, any>) {
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
        }
      ]
    });
  }

  private getVerticalBorder(initialConfig: GameConfig<any, any, any>): GraphicsGroup {
    return new GraphicsGroup({
      members: [
        {
          graphic: new Rectangle({
            width: borderSize,
            height: initialConfig.height * cellSize + borderSize * 2,
            color: lightColor,
          }),
          offset: vec(0,0)
        },
        {
          graphic: new Rectangle({
            width: borderSize/10,
            height: initialConfig.height * cellSize + borderSize * 2,
            color: darkColor,
          }),
          offset: vec(borderSize, borderSize)
        },
        ...this.getVerticalBorderNumbers(initialConfig),
      ]
    });
  }

  private getVerticalBorderNumbers(initialConfig: GameConfig<any, any, any>): GraphicsGrouping[] {
    return Array(initialConfig.width).fill(0).map<GraphicsGrouping>((_, index) => ({
      graphic: new Text({
        text: String(index + 1),
        font: PixelFont30px({
          color: darkColor,
        })
      }),
      offset: vec(index * cellSize + borderSize, borderSize),
    }))
  }

  private getHorizontalBorder(initialConfig: GameConfig<any, any, any>): GraphicsGroup {
    return new GraphicsGroup({
      members: [
        {
          graphic: new Rectangle({
            width: initialConfig.width * cellSize + borderSize * 2,
            height: borderSize,
            color: lightColor,
          }),
          offset: vec(0, 0)
        },
        {
          graphic: new Rectangle({
            width: initialConfig.width * cellSize + borderSize * 2,
            height: borderSize / 10,
            color: darkColor,
          }),
          offset: vec(borderSize, borderSize)
        },
        ...this.getHorizontalBorderLetters(initialConfig),
      ]
    });
  }

  private getHorizontalBorderLetters(initialConfig: GameConfig<any, any, any>): GraphicsGrouping[] {
    const firstCharIndex = 'A'.charCodeAt(0);
    return Array(initialConfig.height).fill(0).map<GraphicsGrouping>((_, index) => ({
      graphic: new Text({
        text: String.fromCharCode(firstCharIndex + index),
        // FIXME Cannot read properties of undefined (reading 'toString')
        //    at FontTextInstance._applyFont (excalibur.js:22153:54)
        //    at FontTextInstance.measureText (excalibur.js:22085:14)
        //    at Font.measureTextWithoutCache (excalibur.js:22498:38)
        //    at FontCache.measureText (excalibur.js:22298:34)
        //    at Font.measureText (excalibur.js:22508:26)
        //    at Text._calculateDimension (excalibur.js:22580:45)
        //    at set text (excalibur.js:22559:14)
        //    at new Text (excalibur.js:22542:19)
        //    at eval (CheckersBoard.ts:109:22)
        //    at Array.map (<anonymous>)
        font: PixelFont30px({
          color: darkColor,
        })
      }),
      offset: vec(borderSize, index * cellSize + borderSize),
    }))
  }

  private getCells(initialConfig: GameConfig<any, any, any>): GraphicsGroup {
    return new GraphicsGroup({
      members: Array(initialConfig.width * initialConfig.height).fill(0).map<GraphicsGrouping>((_, index) => ({
        graphic: new Rectangle({
          width: cellSize,
          height: cellSize,
          color: initialConfig.cellMap[index] === 'light' ? lightColor : darkColor,
        }),
        offset: vec((index % initialConfig.width) * cellSize + borderSize, Math.floor(index / initialConfig.width) * cellSize + borderSize),
      }))
    });
  }
}
