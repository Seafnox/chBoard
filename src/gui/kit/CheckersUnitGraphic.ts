import { GraphicsGroup, Rectangle, vec, Circle, Color } from 'excalibur';

export interface CheckersUnitGraphicConfig {
  cellSize: number;
  unitCenterColor: Color;
  unitOuterColor: Color;
  unitInnerColor: Color;
  lightingColor?: Color;
}

const sizeCoef = 0.9;
const borderCoef = 0.3;

export class CheckersUnitGraphic extends GraphicsGroup {

  constructor(public readonly config: CheckersUnitGraphicConfig) {
    const unitRadius = config.cellSize / 2 * sizeCoef;
    const borderRadius = unitRadius * borderCoef / 2;
    const unitOffset = config.cellSize / 2 - unitRadius;

    super({
      members: [
        ...(!config.lightingColor ? []: [{
          graphic: new Rectangle({
            width: config.cellSize * sizeCoef,
            height: config.cellSize * sizeCoef,
            color: config.lightingColor,
          }),
          offset: vec(2 + config.cellSize * (1 - sizeCoef) / 2, 2 + config.cellSize * (1 - sizeCoef) / 2),
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
        {
          graphic: new Circle({
            radius: borderRadius,
            color: config.unitCenterColor,
          }),
          offset: vec(unitOffset + unitRadius - borderRadius, unitOffset + unitRadius - borderRadius),
        },
      ]
    });

  }
}
