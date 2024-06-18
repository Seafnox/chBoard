import { Color } from 'excalibur';

const enum KitColorName {
  White = 'White',
  Black = 'Black',
  Pink = 'Pink',
  Red = 'Red',
  Orange = 'Orange',
  Yellow = 'Yellow',
  Green = 'Green',
  Cyan = 'Cyan',
  Blue = 'Blue',
  Violet = 'Violet',
}

export const KitColor: Record<KitColorName, Color> = {
  [KitColorName.White]: Color.White,
  [KitColorName.Black]: Color.Black,
  [KitColorName.Pink]: Color.Magenta,
  [KitColorName.Red]: Color.Red,
  [KitColorName.Orange]: Color.Orange,
  [KitColorName.Yellow]: Color.Yellow,
  [KitColorName.Green]: Color.Green,
  [KitColorName.Cyan]: Color.Cyan,
  [KitColorName.Blue]: Color.Blue,
  [KitColorName.Violet]: Color.Violet,
}
