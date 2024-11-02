import { ScreenElement, Rectangle, GraphicsGroup, vec, Text, Vector } from 'excalibur';
import { GraphicsGrouping } from 'excalibur/build/dist/Graphics/GraphicsGroup';
import { Enumerable } from '../../engine/Enumerable';
import { borderFont, darkBoardColor, lightBoardColor, graphicState, borderBorderCoef, borderSize, cellSize } from './CheckersConstants';
import {BoardDto} from "../../engine/dto/BoardDto";

export class CheckersBoardElement<TCellType extends Enumerable, TUnitType extends Enumerable, TUnitOwner extends Enumerable> extends ScreenElement {

  constructor(
    public readonly boardData: BoardDto<TCellType, TUnitType, TUnitOwner>,
    public readonly position: Vector,
  ) {
    super({
      width: cellSize * boardData.width + borderSize * 2,
      height: cellSize * boardData.height + borderSize * 2,
      pos: position,
    });

    this.graphics.add(graphicState, this.getStateGroup(boardData));
  }

  onInitialize() {
    this.graphics.use(graphicState);
  }

  private getStateGroup(boardData: BoardDto<TCellType, TUnitType, TUnitOwner>) {
    const offsetX = (2 * borderSize + boardData.width * cellSize) / 2;
    return new GraphicsGroup({
      members: [
        {
          graphic: this.getVerticalBorder(boardData, true),
          offset: vec(- offsetX, 0),
        },
        {
          graphic: this.getHorizontalBorder(boardData, true),
          offset: vec(- offsetX, 0),
        },
        {
          graphic: this.getHorizontalBorder(boardData),
          offset: vec(- offsetX, boardData.height * cellSize + borderSize),
        },
        {
          graphic: this.getVerticalBorder(boardData),
          offset: vec(boardData.width * cellSize + borderSize - offsetX, 0),
        },
        {
          graphic: this.getVerticalBorderNumbers(boardData),
          offset: vec(borderSize - offsetX, 0),
        },
        {
          graphic: this.getVerticalBorderNumbers(boardData),
          offset: vec(borderSize - offsetX, boardData.width * cellSize + borderSize),
        },
        {
          graphic: this.getHorizontalBorderLetters(boardData),
          offset: vec(- offsetX, borderSize),
        },
        {
          graphic: this.getHorizontalBorderLetters(boardData),
          offset: vec(boardData.height * cellSize + borderSize - offsetX, borderSize),
        },
        {
          graphic: this.getCells(boardData),
          offset: vec(borderSize - offsetX, borderSize),
        },
      ],
    });
  }

  private getVerticalBorder(
    boardData: BoardDto<TCellType, TUnitType, TUnitOwner>,
    isLeftBorder = false,
  ): GraphicsGroup {
    return new GraphicsGroup({
      members: [
        {
          graphic: new Rectangle({
            width: borderSize,
            height: boardData.height * cellSize + borderSize * 2 * (1 - borderBorderCoef),
            color: lightBoardColor,
          }),
          offset: vec(0, borderSize * borderBorderCoef),
        },
        {
          graphic: new Rectangle({
            width: borderSize * borderBorderCoef,
            height: boardData.height * cellSize + borderSize * 2,
            color: darkBoardColor,
          }),
          offset: vec(isLeftBorder ? 0 : borderSize * (1 - borderBorderCoef), 0),
        },
        {
          graphic: new Rectangle({
            width: borderSize * borderBorderCoef,
            height: boardData.height * cellSize + borderSize * 2 * borderBorderCoef,
            color: darkBoardColor,
          }),
          offset: vec(isLeftBorder ? borderSize * (1 - borderBorderCoef) : 0, borderSize * (1 - borderBorderCoef)),
        },
      ],
    });
  }

  private getVerticalBorderNumbers(boardData: BoardDto<TCellType, TUnitType, TUnitOwner>): GraphicsGroup {
    return new GraphicsGroup({
      members: Array(boardData.width).fill(0).map<GraphicsGrouping>((_, index) => ({
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
    boardData: BoardDto<TCellType, TUnitType, TUnitOwner>,
    isTopBorder = false,
  ): GraphicsGroup {
    return new GraphicsGroup({
      members: [
        {
          graphic: new Rectangle({
            width: boardData.width * cellSize + borderSize * 2 * (1 - borderBorderCoef),
            height: borderSize,
            color: lightBoardColor,
          }),
          offset: vec(borderSize * borderBorderCoef, 0),
        },
        {
          graphic: new Rectangle({
            width: boardData.width * cellSize + borderSize * 2,
            height: borderSize * borderBorderCoef,
            color: darkBoardColor,
          }),
          offset: vec(0, isTopBorder ? 0 : borderSize * (1 - borderBorderCoef)),
        },
        {
          graphic: new Rectangle({
            width: boardData.width * cellSize + borderSize * 2 * borderBorderCoef,
            height: borderSize * borderBorderCoef,
            color: darkBoardColor,
          }),
          offset: vec(borderSize * (1 - borderBorderCoef), isTopBorder ? borderSize * (1 - borderBorderCoef) : 0),
        },
      ],
    });
  }

  private getHorizontalBorderLetters(boardData: BoardDto<TCellType, TUnitType, TUnitOwner>): GraphicsGroup {
    const firstCharIndex = 'A'.charCodeAt(0);
    return new GraphicsGroup({
      members: Array(boardData.height).fill(0).map<GraphicsGrouping>((_, index) => ({
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

  private getCells(boardData: BoardDto<TCellType, TUnitType, TUnitOwner>): GraphicsGroup {
    const cellMembers: GraphicsGrouping[] = [];
    for (let y = 0; y < boardData.height; y++) {
      for (let x = 0; x < boardData.width; x++) {
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
