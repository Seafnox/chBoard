import { ScreenElement, Vector, GraphicsGroup, vec, Color } from 'excalibur';
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
    this.graphics.add(InteractiveState.Idle, this.getIdleState(this.config.cellSize, this.config));
  }

  onInitialize() {
    this.graphics.use(InteractiveState.Idle);
  }

  changePlayer(player: TUnitOwner) {
    console.log(this.constructor.name, 'changePlayer', this.currentPlayer, player);
    this.currentPlayer = player;
    this.graphics.add(InteractiveState.Idle, this.getIdleState(this.config.cellSize, this.config));
  }


  private getIdleState(cellSize: number, config: CurrentTurnElementConfig<TUnitOwner, TUnitType>) {
    const currentScheme = config.playerScheme[this.currentPlayer][config.unitType];
    return new GraphicsGroup({
      members: [
        {
          graphic: new CheckersUnitGraphic({
            cellSize: cellSize,
            unitCenterColor: currentScheme.unitColor[0],
            unitInnerColor: currentScheme.unitColor[1],
            unitOuterColor: currentScheme.unitColor[2],
          }),
          offset: vec(0, - cellSize / 1.85),
        },
        {
          graphic: new ButtonLabel({
            width: cellSize,
            height: fontSize,
            label: 'TURN',
            labelColor: currentScheme.unitColor[1],
            labelShadowColor: Color.Black,
          }),
          offset: vec(cellSize * 2 + fontOffset, 0),
        },
      ]
    });
  }
}
