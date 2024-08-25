import { Color } from 'excalibur';
import { Enumerable } from '../../engine/Enumerable';

export type PlayerColorScheme<TUnitType extends Enumerable> = Record<TUnitType, UnitColorScheme>;

export interface UnitColorScheme {
  unitColor: [Color, Color, Color];
  hoverColor: Color;
  activeColor?: Color;
  pressedColor?: Color;
}
