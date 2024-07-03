import { ScreenElement, Vector, Color, GraphicsGroup, Circle, vec } from 'excalibur';
import { SystemActionEvent } from '../events/SystemActionEvent';
import { SystemName } from '../events/SystemName';
import { InteractiveState } from './InteractiveState';

export interface CheckersUnitConfig {
  cellSize: number;
  position: number[];
  isActive?: boolean;
  isSelected?: boolean;
  offset: Vector;
  unitColor: [Color, Color];
  hoverColor: Color;
  activeColor?: Color;
  pressedColor?: Color;
  onClick?: (event: SystemActionEvent) => void;
}

interface CheckersUnitStateConfig {
  cellSize: number;
  unitOuterColor: Color;
  unitInnerColor: Color;
  lightingColor?: Color;
}

const sizeCoef = 0.9;
const borderCoef = 0.3;
const systemName = SystemName.Unit;

export class CheckersUnit extends ScreenElement {
  private isPointerDownHere = false;
  private isActive = false;
  private isSelected = false;

  constructor(
    private config: CheckersUnitConfig
  ) {
    super({
      name: `${systemName}-${config.position[0]}-${config.position[1]}`,
      offset: config.offset,
    });

    this.setSelected(!!config.isSelected);
    this.setActive(!!config.isActive);

    this.graphics.add(InteractiveState.Idle, this.getIdleState(config));
    this.graphics.add(InteractiveState.Hover, this.getHoverState(config));
    this.graphics.add(InteractiveState.Pressed, this.getPressedState(config));
    this.graphics.add(InteractiveState.Active, this.getActiveState(config));
  }

  onInitialize() {
    this.graphics.use(InteractiveState.Idle);
    this.on('pointerup', () => {
      if (!this.isPointerDownHere || !this.isActive) {
        return;
      }
      this.isPointerDownHere = false;
      setTimeout(() => this.graphics.use(InteractiveState.Hover));

      this.config.onClick && this.config.onClick({
        systemName,
      });
    })
    this.on('pointerdown', () => {
      if (!this.isActive) {
        return;
      }
      this.isPointerDownHere = true;
      this.graphics.use(InteractiveState.Pressed);
    })
    this.on('pointerenter', () => {
      if (!this.isActive) {
        return;
      }
      this.isPointerDownHere = false;
      this.graphics.use(InteractiveState.Hover);
    })
    this.on('pointerleave', () => {
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
    return this.getCustomState({
      cellSize: config.cellSize,
      unitOuterColor: config.unitColor[0],
      unitInnerColor: config.unitColor[1],
    });
  }

  private getHoverState(config: CheckersUnitConfig) {
    return this.getCustomState({
      cellSize: config.cellSize,
      unitOuterColor: config.unitColor[0],
      unitInnerColor: config.unitColor[1],
      lightingColor: config.hoverColor,
    });
  }

  private getPressedState(config: CheckersUnitConfig) {
    return this.getCustomState({
      cellSize: config.cellSize,
      unitOuterColor: config.unitColor[0],
      unitInnerColor: config.unitColor[1],
      lightingColor: config.pressedColor || config.hoverColor,
    });
  }

  private getActiveState(config: CheckersUnitConfig) {
    return this.getCustomState({
      cellSize: config.cellSize,
      unitOuterColor: config.unitColor[0],
      unitInnerColor: config.unitColor[1],
      lightingColor: config.activeColor || config.hoverColor,
    });
  }

  private getCustomState(config: CheckersUnitStateConfig): GraphicsGroup {
    const unitRadius = config.cellSize / 2 * sizeCoef;
    const borderRadius = unitRadius * borderCoef / 2;
    const unitOffset = config.cellSize / 2 - unitRadius;
    return new GraphicsGroup({
      members: [
        ...(!config.lightingColor ? []: [{
          graphic: new Circle({
            radius: config.cellSize / 2,
            color: config.lightingColor,
          }),
          offset: vec(0, 0),
        }]),
        {
          graphic: new Circle({
            radius: unitRadius,
            color: config.unitOuterColor,
          }),
          offset: vec(unitOffset, unitOffset),
        },
        {
          graphic: new Circle({
            radius: unitRadius - borderRadius,
            color: config.unitInnerColor,
          }),
          offset: vec(unitOffset + borderRadius, unitOffset + borderRadius),
        },
      ]
    })
  }
}
