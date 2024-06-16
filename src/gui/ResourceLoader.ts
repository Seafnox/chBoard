import { Loader } from "excalibur";
import { PixelFontResource } from './PrepareFonts';
import { UnitSprite } from './PrepareSprites';


export const ResourceLoader = new Loader();

// FONTS
ResourceLoader.addResource(PixelFontResource);
// SPRITES
ResourceLoader.addResource(UnitSprite);
