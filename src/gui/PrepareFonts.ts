import { FontSource, FontUnit, vec } from 'excalibur';
import { FontOptions } from 'excalibur/build/dist/Graphics/FontCommon';

export const PixelFontResource = new FontSource('../resources/fonts/Better_VCR.ttf', 'BetterVCR');

// TODO make color scheme with negative shadow maps.
// TODO make shadow scheme with light direction and offsetSize
// TODO make size scheme with 7 levels of size
export const PixelFont30px = (options?: FontOptions) => PixelFontResource.toFont({
  size: 30,
  unit: FontUnit.Px,
  ...options,
  shadow: {
    blur: 2,
    offset: vec(2, 2),
    ...options?.shadow,
  }
})

export const PixelFont60px = (options?: FontOptions) => PixelFontResource.toFont({
  size: 60,
  unit: FontUnit.Px,
  ...options,
  shadow: {
    blur: 4,
    offset: vec(4, 4),
    ...options?.shadow,
  }
})
