import { ScreenElement, vec, Text, BaseAlign, Vector, Color, GraphicsGroup, Circle, Line } from 'excalibur';
import { SystemName } from '../events/SystemName';
import { GameEvent } from '../GameEngine';
import { PixelFont30px } from '../PrepareFonts';
import { ButtonState } from './ButtonState';

export interface BackButtonConfig {
  pos?: Vector;
  labelColor: Color;
  labelShadowColor?: Color;
}

interface BackButtonStateConfig {
  background: Color;
  border: Color;
}

const width = 150;
const height = 50;
const borderSize = 5;
const lineWidth = 5;

export class BackButton extends ScreenElement {
  private label: Text;
  private isPointerDownHere = false;

  constructor(config: BackButtonConfig) {
    super({
      name: SystemName.Back,
      pos: vec(50, 50),
      width,
      height,
    });

    this.label = new Text({
      text: SystemName.Back,
      color: config.labelColor,
      font: PixelFont30px({
        baseAlign: BaseAlign.Middle,
        shadow: {color: config.labelShadowColor}
      }),
    });

    this.graphics.add(ButtonState.Idle, this.getIdleState());
    this.graphics.add(ButtonState.Hover, this.getHoverState());
    this.graphics.add(ButtonState.Pressed, this.getPressedState());
  }

  onInitialize() {
    this.graphics.use(ButtonState.Idle);
    this.on('pointerup', () => {
      if (!this.isPointerDownHere) {
        return;
      }
      this.isPointerDownHere = false;
      this.graphics.use(ButtonState.Hover);
      // TODO refactor to callback function
      this.events.emit(GameEvent.MenuButtonClicked, {
        systemName: SystemName.Back,
      });
    })
    this.on('pointerdown', () => {
      this.isPointerDownHere = true;
      this.graphics.use(ButtonState.Pressed);
    })
    this.on('pointerenter', () => {
      this.isPointerDownHere = false;
      this.graphics.use(ButtonState.Hover);
    })
    this.on('pointerleave', () => {
      this.isPointerDownHere = false;
      this.graphics.use(ButtonState.Idle);
    })
  }


  private getIdleState(): GraphicsGroup {
    return this.getConfigurableState({
      background: Color.White,
      border: Color.Black,
    });
  }

  private getHoverState(): GraphicsGroup {
    return this.getConfigurableState({
      background: Color.Cyan,
      border: Color.Black,
    });
  }

  private getPressedState(): GraphicsGroup {
    return this.getConfigurableState({
      background: Color.Blue,
      border: Color.Black,
    });
  }

  private getConfigurableState(config: BackButtonStateConfig): GraphicsGroup {
    return new GraphicsGroup({
      members: [
        {
          graphic: new Circle({
            radius: height/2,
            color: config.border,
          }),
          offset: vec(0, 0),
        },
        {
          graphic: new Circle({
            radius: (height - borderSize * 2)/2,
            color: config.background,
          }),
          offset: vec(borderSize, borderSize),
        },
        {
          graphic: new Line({
            start: vec(0, 0),
            end: vec(height/2, 0),
            thickness: lineWidth,
            color: config.border,
          }),
          offset: vec(borderSize/2 + height/4, height/2 + lineWidth/2),
        },
        {
          graphic: new Line({
            start: vec(0, -lineWidth/4 - 1),
            end: vec(height/4, height/4),
            thickness: lineWidth,
            color: config.border,
          }),
          offset: vec(borderSize/2 + height/4, height/2 + lineWidth/2),
        },
        {
          graphic: new Line({
            start: vec(0, lineWidth/4 + 1),
            end: vec(height/4, -height/4),
            thickness: lineWidth,
            color: config.border,
          }),
          offset: vec(borderSize/2 + height/4, height/2 + lineWidth/2),
        },
        {
          graphic: this.label,
          offset: vec(width/2 + height, height/2),
        },
      ],
    });
  }
}
