import { ScreenElement, Vector, Color, GraphicsGroup, vec } from 'excalibur';
import { Enumerable } from '../../engine/Enumerable';
import { ButtonLabel } from './ButtonLabel';
import { CheckersUnitGraphic } from './CheckersUnitGraphic';
import { InteractiveState } from './InteractiveState';

export interface CurrentTurnElementConfig<TUnitOwner extends Enumerable> {
  cellSize: number;
  position: Vector;
  initialPlayer: TUnitOwner;
  playerScheme: Record<TUnitOwner, PlayerColorScheme>;
}

export interface PlayerColorScheme {
  unitColor: [Color, Color];
  hoverColor: Color;
  activeColor?: Color;
  pressedColor?: Color;
}

const fontSize = 60;
const fontOffset = 20;
const fontWidth = 80;

export class CurrentTurnElement<TUnitOwner extends Enumerable> extends ScreenElement {
  currentPlayer: TUnitOwner;

  constructor(
    public readonly config: CurrentTurnElementConfig<TUnitOwner>,
  ) {
    super({
      name: 'CurrentTurn',
      width: Math.max(config.cellSize, fontWidth),
      height: config.cellSize + fontSize + fontOffset,
      pos: config.position,
    });

    this.currentPlayer = config.initialPlayer;
    this.graphics.add(InteractiveState.Idle, this.getIdleState(config.cellSize, config));
  }

  onInitialize() {
    this.graphics.use(InteractiveState.Idle);
  }

  changePlayer(player: TUnitOwner) {
    this.currentPlayer = player;
  }


  private getIdleState(cellSize: number, config: CurrentTurnElementConfig<TUnitOwner>) {
    const currentScheme = config.playerScheme[this.currentPlayer];
    return new GraphicsGroup({
      members: [
        {
          graphic: new ButtonLabel({
            width: cellSize,
            height: fontSize,
            label: 'TURN',
            labelColor: Color.Black,
            labelShadowColor: Color.White,
          }),
          offset: vec(0, 0),
        },
        {
          graphic: new CheckersUnitGraphic({
            cellSize: cellSize,
            unitOuterColor: currentScheme.unitColor[0],
            unitInnerColor: currentScheme.unitColor[1],
            lightingColor: currentScheme.hoverColor,
          }),
          offset: vec(cellSize / 2, fontSize + fontOffset),
        },
      ]
    });
  }
}
