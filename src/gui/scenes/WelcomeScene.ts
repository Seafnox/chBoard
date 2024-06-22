import { Scene, Label, vec, Color, Actor } from 'excalibur';
import { ButtonName } from '../events/ButtonName';
import { GameEvent, GameEngine } from '../GameEngine';
import { KitColor } from '../kit/KitColor';
import { RoundedButton } from '../kit/RoundedButton';
import { PixelFont60px } from '../PrepareFonts';

export class WelcomeScene extends Scene {

  onInitialize(engine: GameEngine) {
    engine.add(this.createHeader(engine));
    engine.add(this.createButton(engine, 200, ButtonName.Play));
    engine.add(this.createButton(engine, 350, ButtonName.Settings));
    engine.add(this.createButton(engine, 500, ButtonName.Help));
  }

  createHeader(engine: GameEngine): Actor {
    return new Label({
      text: 'CHECKERS',
      pos: vec(engine.screen.center.x, 50),
      color: Color.White,
      font: PixelFont60px({shadow: {color: Color.Black}}),
    });
  }

  private createButton(engine: GameEngine, offsetY: number, label: ButtonName): Actor {
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

    button.events.on(GameEvent.MenuButtonClicked, event =>
      engine.gameEvents.emit(GameEvent.MenuButtonClicked, event)
    );

    return button;
  }
}
