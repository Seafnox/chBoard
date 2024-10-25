import { FontSource, FontUnit, vec, TextAlign, FontOptions, GraphicOptions, RasterOptions } from 'excalibur';
import { FontSize } from './UiConstants';

export const PixelFontResource = new FontSource('../resources/fonts/Better_VCR.ttf', 'BetterVCR');

// TODO make color scheme with negative shadow maps.
// TODO make shadow scheme with light direction and offsetSize
// TODO make size scheme with 7 levels of size
export const PixelFont30px = (options?: FontOptions & GraphicOptions & RasterOptions) => PixelFontResource.toFont({
  size: FontSize.Medium,
  unit: FontUnit.Px,
  textAlign: TextAlign.Center,
  ...(options || {}),
  ...(!options?.shadow ? {} : {
    shadow: {
      blur: 2,
      offset: vec(2, 2),
      ...(options?.shadow || {}),
    },
  }),
});

export const PixelFont60px = (options?: FontOptions & GraphicOptions & RasterOptions) => PixelFontResource.toFont({
  size: FontSize.Big,
  unit: FontUnit.Px,
  textAlign: TextAlign.Center,
  ...options,
  ...(!options?.shadow ? {} : {
    shadow: {
      blur: 4,
      offset: vec(4, 4),
      ...options?.shadow,
    },
  }),
});
