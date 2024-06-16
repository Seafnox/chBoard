import { Scene, Engine, Label, Color, vec } from 'excalibur';
import { PixelFont30px } from '../PrepareFonts';

export class NotImplementedScene extends Scene {
  public onInitialize(engine: Engine) {
    const text = new Label({
      text: 'Not Implemented!',
      pos: engine.screen.center.sub(vec(200, 100)),
      color: Color.White,
      font: PixelFont30px({
        shadow: {
          color: Color.Black,
        }
      }),
    });

    this.add(text);
  }
}
