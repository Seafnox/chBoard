import { Scene, Label, Color, vec, BaseAlign } from 'excalibur';
import { GameEngine } from '../engine/GameEngine';
import { GameEvent } from '../engine/GameEvent';
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
      labelShadowColor: Color.Black,
      onClick: event => engine.gameEvents.emit(GameEvent.SystemAction, event),
    });

    this.add(backButton);
  }
}
