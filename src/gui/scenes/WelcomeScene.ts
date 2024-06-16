import { Scene, Engine, Label, vec, Color } from 'excalibur';
import { ActorEvents } from '../events/ActorEvents';
import { PixelFont60px } from '../PrepareFonts';

export class WelcomeScene extends Scene {

  onInitialize(engine: Engine) {
    engine.add(this.createHeader(engine));
  }



  createHeader(engine: Engine) {
    let prevTextWidth = 0;
    const text = new Label({
      text: 'CHECKERS',
      pos: vec(engine.screen.center.x, 50),
      color: Color.White,
      font: PixelFont60px({shadow: {color: Color.Black}}),
    });

    let counter = 0;

    const drawChangeSubscription = text.events.on(ActorEvents.PostDraw, () => {
      counter++;
      if (prevTextWidth !== text.getTextWidth()) {
        prevTextWidth = text.getTextWidth();
        text.pos.x = engine.screen.center.x - text.getTextWidth() / 2;
        counter = 0;
      }
      if (counter > 10) {
        drawChangeSubscription.close();
      }
    });

    return text;
  }
}
