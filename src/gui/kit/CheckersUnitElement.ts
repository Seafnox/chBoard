import { ScreenElement, Vector, Color, vec } from 'excalibur';
import { Vector2d } from '../../engine/Vector2d';
import { SystemActionEvent } from '../events/SystemActionEvent';
import { SystemName } from '../events/SystemName';
import { CheckersUnitGraphic } from './CheckersUnitGraphic';
import { InteractiveState } from './InteractiveState';

export interface CheckersUnitConfig {
  cellSize: number;
  cellLocation: Vector2d;
  isActive?: boolean;
  isSelected?: boolean;
  topLeftPosition: Vector;
  unitColor: [Color, Color];
  hoverColor: Color;
  activeColor?: Color;
  pressedColor?: Color;
  onClick?: (event: SystemActionEvent<CheckersUnitElement>) => void;
}

const systemName = SystemName.Unit;

export class CheckersUnitElement extends ScreenElement {
  private isPointerDownHere = false;
  private isActive = false;
  private isSelected = false;

  constructor(
    private config: CheckersUnitConfig
  ) {
    super({
      name: `${systemName}-${config.cellLocation.x}-${config.cellLocation.y}`,
      pos: config.topLeftPosition
        .add(vec( config.cellLocation.x * config.cellSize, config.cellLocation.y * config.cellSize))
        .add(vec(-2, -2)),
    });

    this.isSelected = !!config.isSelected;
    this.isActive = !!config.isActive;

    this.graphics.add(InteractiveState.Idle, this.getIdleState(config));
    this.graphics.add(InteractiveState.Hover, this.getHoverState(config));
    this.graphics.add(InteractiveState.Pressed, this.getPressedState(config));
    this.graphics.add(InteractiveState.Active, this.getActiveState(config));
  }

  onInitialize() {
    this.graphics.use(InteractiveState.Idle);
    this.on('pointerup', () => {
      console.log(this.constructor.name, 'pointerup', this.isPointerDownHere, this.isActive);
      if (!this.isPointerDownHere || !this.isActive) {
        return;
      }
      this.isPointerDownHere = false;
      setTimeout(() => this.graphics.use(InteractiveState.Hover));

      this.config.onClick && this.config.onClick({ systemName, source: this });
    })
    this.on('pointerdown', () => {
      console.log(this.constructor.name, 'pointerdown');

      if (!this.isActive) {
        return;
      }
      this.isPointerDownHere = true;
      this.graphics.use(InteractiveState.Pressed);
    })
    this.on('pointerenter', () => {
      console.log(this.constructor.name, 'pointerenter');
      if (!this.isActive) {
        return;
      }
      this.isPointerDownHere = false;
      this.graphics.use(InteractiveState.Hover);
    })
    this.on('pointerleave', () => {
      console.log(this.constructor.name, 'pointerleave');
      if (!this.isActive) {
        return;
      }
      this.isPointerDownHere = false;
      this.graphics.use(this.isSelected ? InteractiveState.Active : InteractiveState.Idle);
    })

  }

  setActive(isActive: boolean) {
    this.isActive = isActive;
  }

  setSelected(isSelected: boolean) {
    this.isSelected = isSelected;
    this.graphics.use(isSelected ? InteractiveState.Active : InteractiveState.Idle);
  }

  private getIdleState(config: CheckersUnitConfig) {
    return new CheckersUnitGraphic({
      cellSize: config.cellSize,
      unitOuterColor: config.unitColor[0],
      unitInnerColor: config.unitColor[1],
      lightingColor: this.isActive ? config.activeColor : undefined,
    });
  }

  private getHoverState(config: CheckersUnitConfig) {
    return new CheckersUnitGraphic({
      cellSize: config.cellSize,
      unitOuterColor: config.unitColor[0],
      unitInnerColor: config.unitColor[1],
      lightingColor: config.hoverColor,
    });
  }

  private getPressedState(config: CheckersUnitConfig) {
    return new CheckersUnitGraphic({
      cellSize: config.cellSize,
      unitOuterColor: config.unitColor[0],
      unitInnerColor: config.unitColor[1],
      lightingColor: config.pressedColor || config.hoverColor,
    });
  }

  private getActiveState(config: CheckersUnitConfig) {
    return new CheckersUnitGraphic({
      cellSize: config.cellSize,
      unitOuterColor: config.unitColor[0],
      unitInnerColor: config.unitColor[1],
      lightingColor: config.activeColor || config.hoverColor,
    });
  }
}
