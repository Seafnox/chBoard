import { ScreenElement, Vector, Color, vec, GraphicsGroup, Circle, GraphicsGrouping } from 'excalibur';
import { SystemName } from '../events/SystemName';
import { GameEvent } from '../GameEngine';
import { ButtonState } from './ButtonState';

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

    this.graphics.add(ButtonState.Idle, this.getStateGroup({
      background: config.idleBackground,
      border: config.idleBorder,
      radius: config.radius,
      borderSize: config.borderSize || 0,
      subNodes: config.subNodes,
    }));
    this.graphics.add(ButtonState.Hover, this.getStateGroup({
      background: config.hoverBackground || config.idleBackground,
      border: config.hoverBorder || config.idleBorder,
      radius: config.radius,
      borderSize: config.borderSize || 0,
      subNodes: config.subNodes,
    }));
    this.graphics.add(ButtonState.Pressed, this.getStateGroup({
      background: config.pressedBackground || config.hoverBackground || config.idleBackground,
      border: config.pressedBorder || config.hoverBorder || config.idleBorder,
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
      // TODO refactor to callback function
      this.events.emit(GameEvent.MenuButtonClicked, {
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

  private getStateGroup(config: CircleButtonStateConfig): GraphicsGroup {
    const group = new GraphicsGroup({
      members: [
        {
          graphic: new Circle({
            radius: config.radius,
            color: config.border || config.background,
          }),
          offset: vec(0, config.radius/2),
        },
        {
          graphic: new Circle({
            radius: config.radius - config.borderSize * 2,
            color: config.background,
          }),
          offset: vec(0, config.radius/2 + config.borderSize),
        },
        ...config.subNodes,
      ]
    });

    return group;
  }

}
