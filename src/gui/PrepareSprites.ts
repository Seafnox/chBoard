import { ImageSource, SpriteSheet, Animation } from "excalibur";

export const UnitSprite = new ImageSource('../resources/sprites/unit.png');

export const UnitSpriteSheet = SpriteSheet.fromImageSource({
  image: UnitSprite,
  grid: {
    rows: 1,
    columns: 9,
    spriteHeight: 32,
    spriteWidth: 32
  }
})

export const IdleUnitAnimation = Animation.fromSpriteSheetCoordinates({
  spriteSheet: UnitSpriteSheet,
  frameCoordinates: [
    { x: 2, y: 0},
    { x: 3, y: 0},
  ],
  durationPerFrameMs: 300
});
