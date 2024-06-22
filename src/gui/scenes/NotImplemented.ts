import { Scene, Label, Color, vec } from 'excalibur';
import { ActorEvents } from '../events/ActorEvents';
import { GameEvent, GameEngine } from '../GameEngine';
import { BackButton } from '../kit/BackButton';
import { PixelFont30px } from '../PrepareFonts';

export class NotImplementedScene extends Scene {
  public onInitialize(engine: GameEngine) {
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

    const backButton = new BackButton({
      pos: engine.screen.center.add(vec(0, 100)),
      labelColor: Color.White,
      labelShadowColor: Color.Black
    });

    backButton.events.on(GameEvent.MenuButtonClicked, event => {
      engine.gameEvents.emit(GameEvent.MenuButtonClicked, event);
    })
    this.add(backButton);
  }
}
