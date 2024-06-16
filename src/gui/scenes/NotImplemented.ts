import { Scene, Engine, Label, Color, vec } from 'excalibur';
import { ActorEvents } from '../events/ActorEvents';
import { PixelFont30px } from '../PrepareFonts';

export class NotImplementedScene extends Scene {
  public onInitialize(engine: Engine) {
    let prevTextWidth = 0;
    const text = new Label({
      text: 'Not Implemented!',
      pos: engine.screen.center.sub(vec(0, 100)),
      color: Color.White,
      font: PixelFont30px({
        shadow: {
          color: Color.Black,
        }
      }),
    });

    text.events.on(ActorEvents.PostDraw, () => {
      if (prevTextWidth !== text.getTextWidth()) {
        prevTextWidth = text.getTextWidth();
        text.pos.x = engine.screen.center.x - text.getTextWidth() / 2;
      }
    })

    this.add(text);
  }
}
