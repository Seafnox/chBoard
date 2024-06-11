import { Loader } from "excalibur";
import { PixelFont } from './PrepareFonts';
import { UnitSprite } from './PrepareSprites';


export const ResourceLoader = new Loader();

// FONTS
ResourceLoader.addResource(PixelFont);
// SPRITES
ResourceLoader.addResource(UnitSprite);
