import { Text, BaseAlign, Color } from 'excalibur';
import { PixelFont60px } from '../PrepareFonts';

export interface ButtonLabelConfig {
  width: number;
  height: number;
  label: string;
  labelColor?: Color;
  labelShadowColor?: Color;
}

export class ButtonLabel extends Text {
  constructor(
    config: ButtonLabelConfig,
  ) {
    super({
      width: config.width,
      height: config.height,
      text: config.label,
      color: config.labelColor || Color.Black,
      font: PixelFont60px({
        baseAlign: BaseAlign.Middle,
        shadow: {color: config.labelShadowColor || Color.White},
      }),
    });
  }
}
