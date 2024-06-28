import { Scene, Label, Color, vec, BaseAlign } from 'excalibur';
import { GameEvent, GameEngine } from '../GameEngine';
import { BackButton } from '../kit/BackButton';
import { PixelFont30px } from '../PrepareFonts';

export class NotImplementedScene extends Scene {
  public onInitialize(engine: GameEngine) {
    const text = new Label({
      text: `${engine.currentSceneName} is Not Implemented!`,
      pos: engine.screen.center,
      color: Color.White,
      font: PixelFont30px({
        baseAlign: BaseAlign.Middle,
        shadow: {
          color: Color.Black,
        }
      }),
    });

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
