import { ScreenElement, GraphicsGroup, Vector, Color, Rectangle, vec, Circle, GraphicsGrouping } from 'excalibur';
import { SystemActionEvent } from '../events/SystemActionEvent';
import { SystemName } from '../events/SystemName';
import { ButtonState } from './ButtonState';

export interface RoundedButtonConfig {
  systemName: SystemName;
  width: number;
  height: number;
  radius: number;
  pos: Vector;
  subNodes: GraphicsGrouping[];
  idleBackground: Color;
  hoverBackground?: Color;
  pressedBackground?: Color;
  borderSize?: number; // TODO implement. refactor radius
  idleBorder?: Color;
  hoverBorder?: Color;
  pressedBorder?: Color;
  onClick?: (event: SystemActionEvent) => void;
}

interface RoundedButtonStateConfig {
  background: Color;
  border?: Color;
  width: number;
  height: number;
  radius: number;
  borderSize: number; // TODO implement. refactor radius
  subNodes: GraphicsGrouping[];
}

export class RoundedButton extends ScreenElement {
  private isPointerDownHere = false;

  constructor(
    private config: RoundedButtonConfig,
  ) {
    super({
      name: config.systemName,
      pos: vec(config.pos.x - config.width / 2, config.pos.y - config.height / 2),
      width: config.width,
      height: config.height,
    });

    this.graphics.add(ButtonState.Idle, this.getStateGroup({
      background: config.idleBackground,
      border: config.idleBorder,
      width: config.width,
      height: config.height,
      radius: config.radius,
      borderSize: config.borderSize || 0,
      subNodes: config.subNodes,
    }));
    this.graphics.add(ButtonState.Hover, this.getStateGroup({
      background: config.hoverBackground || config.idleBackground,
      border: config.hoverBorder || config.idleBorder,
      width: config.width,
      height: config.height,
      radius: config.radius,
      borderSize: config.borderSize || 0,
      subNodes: config.subNodes,
    }));
    this.graphics.add(ButtonState.Pressed, this.getStateGroup({
      background: config.pressedBackground || config.hoverBackground || config.idleBackground,
      border: config.pressedBorder || config.hoverBorder || config.idleBorder,
      width: config.width,
      height: config.height,
      radius: config.radius,
      borderSize: config.borderSize || 0,
      subNodes: config.subNodes,
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
      this.config.onClick && this.config.onClick({
        systemName: this.config.systemName,
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
        ...config.subNodes,
      ]
    });

    return group;
  }

}
