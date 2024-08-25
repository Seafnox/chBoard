import { ScreenElement, Vector, Color, GraphicsGroup, vec } from 'excalibur';
import { Enumerable } from '../../engine/Enumerable';
import { ButtonLabel } from './ButtonLabel';
import { CheckersUnitGraphic } from './CheckersUnitGraphic';
import { PlayerColorScheme } from './ColorScheme';
import { InteractiveState } from './InteractiveState';

export interface CurrentTurnElementConfig<TUnitOwner extends Enumerable, TUnitType extends Enumerable> {
  cellSize: number;
  position: Vector;
  initialPlayer: TUnitOwner;
  unitType: TUnitType;
  playerScheme: Record<TUnitOwner, PlayerColorScheme<TUnitType>>;
}

const fontSize = 60;
const fontOffset = 20;
const fontWidth = 80;

export class CurrentTurnElement<TUnitOwner extends Enumerable, TUnitType extends Enumerable> extends ScreenElement {
  currentPlayer: TUnitOwner;

  constructor(
    public readonly config: CurrentTurnElementConfig<TUnitOwner, TUnitType>,
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
    this.graphics.update(0);
  }


  private getIdleState(cellSize: number, config: CurrentTurnElementConfig<TUnitOwner, TUnitType>) {
    const currentScheme = config.playerScheme[this.currentPlayer][config.unitType];
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
            unitCenterColor: currentScheme.unitColor[0],
            unitInnerColor: currentScheme.unitColor[1],
            unitOuterColor: currentScheme.unitColor[2],
            lightingColor: currentScheme.hoverColor,
          }),
          offset: vec(cellSize / 2, fontSize + fontOffset),
        },
      ]
    });
  }
}
