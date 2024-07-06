import { Color, TextAlign, BaseAlign } from 'excalibur';
import { PixelFont30px } from '../PrepareFonts';

export const cellSize = 80;
export const borderSize = 40;
export const borderBorderCoef = 0.1;
export const graphicState = 'root';
export const lightColor = Color.fromHex('DBC1A2');
export const darkColor = Color.fromHex('4F3B2C');
export const borderFont = PixelFont30px({
  textAlign: TextAlign.Center,
  baseAlign: BaseAlign.Middle,
});
