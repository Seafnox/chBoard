import { ScreenElement, GraphicsGroup, Vector, Color, Rectangle, Text, vec, Circle, BaseAlign } from 'excalibur';
import { ButtonName } from '../events/ButtonName';
import { GameEvent } from '../GameEngine';
import { PixelFont60px } from '../PrepareFonts';

export interface RoundedButtonConfig {
  width: number;
  height: number;
  radius: number;
  borderSize?: number; // TODO implement. refactor radius
  pos: Vector;
  label: ButtonName;
  labelColor: Color;
  labelShadowColor?: Color;
  idleBackground: Color;
  hoverBackground?: Color;
  pressedBackground?: Color;
  idleBorder?: Color;
  hoverBorder?: Color;
  pressedBorder?: Color;
}

interface RoundedButtonStateConfig {
  background: Color;
  border?: Color;
  width: number;
  height: number;
  radius: number;
  borderSize: number; // TODO implement. refactor radius
  label: Text;
}

export enum ButtonState {
  Idle = 'idle',
  Hover = 'hover',
  Pressed = 'pressed',
}

export class RoundedButton extends ScreenElement {
  private label: Text;
  private isPointerDownHere = false;

  constructor(
    private config: RoundedButtonConfig,
  ) {
    super({
      pos: vec(config.pos.x - config.width / 2, config.pos.y - config.height / 2),
      width: config.width,
      height: config.height,
    });

    this.label = new Text({
      text: config.label,
      color: config.labelColor,
      font: PixelFont60px({
        baseAlign: BaseAlign.Middle,
        shadow: {color: config.labelShadowColor}
      }),
    });

    this.graphics.add(ButtonState.Idle, this.getStateGroup({
      background: config.idleBackground,
      border: config.idleBorder,
      width: config.width,
      height: config.height,
      radius: config.radius,
      borderSize: config.borderSize || 0,
      label: this.label,
    }));
    this.graphics.add(ButtonState.Hover, this.getStateGroup({
      background: config.hoverBackground || config.idleBackground,
      border: config.hoverBorder || config.idleBorder,
      width: config.width,
      height: config.height,
      radius: config.radius,
      borderSize: config.borderSize || 0,
      label: this.label,
    }));
    this.graphics.add(ButtonState.Pressed, this.getStateGroup({
      background: config.pressedBackground || config.hoverBackground || config.idleBackground,
      border: config.pressedBorder || config.hoverBorder || config.idleBorder,
      width: config.width,
      height: config.height,
      radius: config.radius,
      borderSize: config.borderSize || 0,
      label: this.label,
    }));
  }

  onInitialize() {
    this.graphics.use(ButtonState.Idle);
    this.on('pointerup', () => {
      if (!this.isPointerDownHere) {
        return;
      }
      this.isPointerDownHere = false;
      this.graphics.use(ButtonState.Hover);
      this.events.emit(GameEvent.MenuButtonClicked, {
        buttonName: this.config.label,
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

  private getStateGroup(config: RoundedButtonStateConfig): GraphicsGroup {
    const group = new GraphicsGroup({
      members: [
        {
          graphic: new Rectangle({
            width: config.width,
            height: config.height - config.radius * 2,
            color: config.border || config.background,
          }),
          offset: vec(0, config.radius),
        },
        {
          graphic: new Rectangle({
            width: config.width - config.radius * 2,
            height: config.height,
            color: config.border || config.background,
          }),
          offset: vec(config.radius, 0),
        },
        {
          graphic: new Circle({
            radius: config.radius,
            color: config.border || config.background,
          }),
          offset: vec(-1, -1),
        },
        {
          graphic: new Circle({
            radius: config.radius,
            color: config.border || config.background,
          }),
          offset: vec(config.width - config.radius * 2 - 2, -1),
        },
        {
          graphic: new Circle({
            radius: config.radius,
            color: config.border || config.background,
          }),
          offset: vec(-1, config.height - config.radius * 2 - 2),
        },
        {
          graphic: new Circle({
            radius: config.radius,
            color: config.border || config.background,
          }),
          offset: vec(config.width - config.radius * 2 - 2, config.height - config.radius * 2 - 2),
        },
        {
          graphic: new Rectangle({
            width: config.width - config.radius * 2,
            height: config.height - config.radius * 2,
            color: config.background,
          }),
          offset: vec(config.radius, config.radius),
        },
        {
          graphic: this.label,
          offset: vec(config.width / 2, config.height / 2),
        }
      ]
    });

    return group;
  }

}
