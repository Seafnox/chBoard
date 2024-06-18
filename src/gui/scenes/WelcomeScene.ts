import { Scene, Engine, Label, vec, Color, Actor } from 'excalibur';
import { ActorEvents } from '../events/ActorEvents';
import { KitColor } from '../kit/KitColor';
import { RoundedButton } from '../kit/RoundedButton';
import { PixelFont60px } from '../PrepareFonts';

export class WelcomeScene extends Scene {

  onInitialize(engine: Engine) {
    engine.add(this.createHeader(engine));
    engine.add(this.createButton(engine, 200, 'PLAY'));
    engine.add(this.createButton(engine, 350, 'SETTINGS'));
    engine.add(this.createButton(engine, 500, 'QUIT'));
  }

  createHeader(engine: Engine): Actor {
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

  private createButton(engine: Engine, offsetY: number, label: string): Actor {
    const button = new RoundedButton({
      width: 400,
      height: 100,
      radius: 10,
      pos: vec(engine.screen.center.x, offsetY),
      label,
      labelColor: KitColor.Black,
      labelShadowColor: KitColor.White,
      idleBackground: KitColor.Cyan,
      idleBorder: KitColor.Black,
      hoverBackground: KitColor.Blue,
      hoverBorder: KitColor.Black,
      pressedBackground: KitColor.Pink,
      pressedBorder: KitColor.Black,
    });

    return button;
  }
}
