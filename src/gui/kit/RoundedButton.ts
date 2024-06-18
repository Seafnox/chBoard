import { ScreenElement, GraphicsGroup, Vector, Color, Rectangle, Text, vec, Circle } from 'excalibur';
import { GameEvent } from '../GameEngine';
import { PixelFont60px } from '../PrepareFonts';

export interface RoundedButtonConfig {
  width: number;
  height: number;
  radius: number; // TODO implement
  pos: Vector;
  label: string;
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
  radius: number; // TODO implement
  label: Text;
  labelOffset: Vector;
}

export enum ButtonState {
  Idle = 'idle',
  Hover = 'hover',
  Pressed = 'pressed',
}

export class RoundedButton extends ScreenElement {
  private label: Text;

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
      width: config.width - config.radius,
      height: config.height - config.radius,
      color: config.labelColor,
      font: PixelFont60px({shadow: {color: config.labelShadowColor}}),
    });

    this.graphics.add(ButtonState.Idle, this.getStateGroup({
      background: config.idleBackground,
      border: config.idleBorder,
      width: config.width,
      height: config.height,
      radius: config.radius,
      label: this.label,
      labelOffset: vec(0, 0),
    }));
    this.graphics.add(ButtonState.Hover, this.getStateGroup({
      background: config.hoverBackground || config.idleBackground,
      border: config.hoverBorder || config.idleBorder,
      width: config.width,
      height: config.height,
      radius: config.radius,
      label: this.label,
      labelOffset: vec(0, 0),
    }));
    this.graphics.add(ButtonState.Pressed, this.getStateGroup({
      background: config.pressedBackground || config.hoverBackground || config.idleBackground,
      border: config.pressedBorder || config.hoverBorder || config.idleBorder,
      width: config.width,
      height: config.height,
      radius: config.radius,
      label: this.label,
      labelOffset: vec(0, 0),
    }));
  }

  onInitialize() {
    this.graphics.use(ButtonState.Idle);
    this.on('pointerup', () => {
      this.graphics.use(ButtonState.Hover);
      this.events.emit(GameEvent.ButtonClicked, {
        buttonName: this.config.label,
      });
    })
    this.on('pointerdown', () => {
      this.graphics.use(ButtonState.Pressed);
    })
    this.on('pointerenter', () => {
      this.graphics.use(ButtonState.Hover);
    })
    this.on('pointerleave', () => {
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
          offset: config.labelOffset.add(vec(config.radius, config.radius)),
        }
      ]
    });

    return group;
  }

}
