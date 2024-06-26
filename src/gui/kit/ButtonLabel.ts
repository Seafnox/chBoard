import { Text, BaseAlign, Color } from 'excalibur';
import { PixelFont60px } from '../PrepareFonts';
import { KitColor } from './KitColor';

export interface ButtonLabelConfig {
  label: string;
  labelColor?: Color;
  labelShadowColor?: Color;
}

export class ButtonLabel extends Text {
  constructor(
    config: ButtonLabelConfig
  ) {
    super({
      text: config.label,
      color: config.labelColor || KitColor.Black,
      font: PixelFont60px({
        baseAlign: BaseAlign.Middle,
        shadow: {color: config.labelShadowColor || KitColor.White}
      }),
    });
  }
}
