import { Color, TextAlign, BaseAlign } from 'excalibur';
import { CheckersUnitOwner } from '../../engineCheckers/simple/commons/CheckersUnitOwner';
import { CheckersUnitType } from '../../engineCheckers/simple/commons/CheckersUnitType';
import { PixelFont30px } from '../PrepareFonts';
import { PlayerColorScheme } from './ColorScheme';

export const cellSize = 80;
export const borderSize = 40;
export const borderBorderCoef = 0.1;
export const graphicState = 'root';
export const lightBoardColor = Color.fromHex('DBC1A2');
export const darkBoardColor = Color.fromHex('4F3B2C');
export const borderFont = PixelFont30px({
  textAlign: TextAlign.Center,
  baseAlign: BaseAlign.Middle,
});
export const playerSchemes: Record<CheckersUnitOwner, PlayerColorScheme<CheckersUnitType>> = {
  [CheckersUnitOwner.Black]: {
    [CheckersUnitType.Checker]: {
      unitColor: [Color.DarkGray, Color.DarkGray, Color.Black],
      hoverColor: Color.Gray,
      activeColor: Color.fromHex("#ffff4033"),
      pressedColor: Color.fromHex("#ffff40aa"),
    },
    [CheckersUnitType.King]: {
      unitColor: [Color.Black, Color.DarkGray, Color.Black],
      hoverColor: Color.Gray,
      activeColor: Color.fromHex("#ffff4033"),
      pressedColor: Color.fromHex("#ffff40aa"),
    },
  },
  [CheckersUnitOwner.White]: {
    [CheckersUnitType.Checker]: {
      unitColor: [Color.LightGray, Color.LightGray, Color.White],
      hoverColor: Color.Gray,
      activeColor: Color.fromHex("#ffff4033"),
      pressedColor: Color.fromHex("#ffff40aa"),
    },
    [CheckersUnitType.King]: {
      unitColor: [Color.White, Color.LightGray, Color.White],
      hoverColor: Color.Gray,
      activeColor: Color.fromHex("#ffff4033"),
      pressedColor: Color.fromHex("#ffff40aa"),
    },
  },

}
