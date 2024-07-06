import { ScreenElement, Vector, Color, vec, GraphicsGroup, Circle, GraphicsGrouping } from 'excalibur';
import { SystemActionEvent } from '../events/SystemActionEvent';
import { SystemName } from '../events/SystemName';
import { InteractiveState } from './InteractiveState';

export interface CircleButtonConfig {
  systemName: SystemName;
  radius: number;
  pos: Vector;
  subNodes: GraphicsGrouping[];
  borderSize?: number;
  idleBorder?: Color;
  hoverBorder?: Color;
  pressedBorder?: Color;
  idleBackground?: Color;
  hoverBackground?: Color;
  pressedBackground?: Color;
  onClick?: (event: SystemActionEvent<CircleButton>) => void;
}

export interface CircleButtonStateConfig {
  radius: number;
  subNodes: GraphicsGrouping[];
  background?: Color;
  borderSize: number;
  border?: Color;
  textOffset?: number;
}

export class CircleButton extends ScreenElement {
  private isPointerDownHere = false;

  constructor(
    private config: CircleButtonConfig,
  ) {
    super({
      name: config.systemName,
      pos: vec(config.pos.x - config.radius / 2, config.pos.y - config.radius / 2),
      width: config.radius,
      height: config.radius,
    });

    this.graphics.add(InteractiveState.Idle, this.getStateGroup({
      background: config.idleBackground,
      border: config.idleBorder,
      radius: config.radius,
      borderSize: config.borderSize || 0,
      subNodes: config.subNodes,
    }));
    this.graphics.add(InteractiveState.Hover, this.getStateGroup({
      background: config.hoverBackground || config.idleBackground,
      border: config.hoverBorder || config.idleBorder,
      radius: config.radius,
      borderSize: config.borderSize || 0,
      subNodes: config.subNodes,
    }));
    this.graphics.add(InteractiveState.Pressed, this.getStateGroup({
      background: config.pressedBackground || config.hoverBackground || config.idleBackground,
      border: config.pressedBorder || config.hoverBorder || config.idleBorder,
      radius: config.radius,
      borderSize: config.borderSize || 0,
      subNodes: config.subNodes,
    }));
  }

  onInitialize() {
    this.graphics.use(InteractiveState.Idle);
    this.on('pointerup', () => {
      if (!this.isPointerDownHere) {
        return;
      }
      this.isPointerDownHere = false;
      this.graphics.use(InteractiveState.Hover);
      this.config.onClick && this.config.onClick({
        systemName: this.config.systemName,
        source: this,
      });
    })
    this.on('pointerdown', () => {
      this.isPointerDownHere = true;
      this.graphics.use(InteractiveState.Pressed);
    })
    this.on('pointerenter', () => {
      this.isPointerDownHere = false;
      this.graphics.use(InteractiveState.Hover);
    })
    this.on('pointerleave', () => {
      this.isPointerDownHere = false;
      this.graphics.use(InteractiveState.Idle);
    })
  }

  private getStateGroup(config: CircleButtonStateConfig): GraphicsGroup {
    const group = new GraphicsGroup({
      members: [
        {
          graphic: new Circle({
            radius: config.radius - 1,
            color: config.border || config.background,
          }),
          offset: vec(0, 0),
        },
        {
          graphic: new Circle({
            radius: config.radius - 1 - config.borderSize,
            color: config.background,
          }),
          offset: vec(config.borderSize, config.borderSize),
        },
        ...config.subNodes,
      ]
    });

    return group;
  }

}
