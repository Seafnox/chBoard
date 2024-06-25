import { Scene, Label, vec, Color, Actor } from 'excalibur';
import { ButtonName } from '../events/ButtonName';
import { GameEvent, GameEngine } from '../GameEngine';
import { KitColor } from '../kit/KitColor';
import { ModalWindow } from '../kit/ModalWindow';
import { RoundedButton } from '../kit/RoundedButton';
import { PixelFont60px } from '../PrepareFonts';

export class WelcomeScene extends Scene {

  get gameEngine(): GameEngine {
    return this.engine as GameEngine;
  }

  onInitialize(engine: GameEngine) {
    this.engine = engine;
    this.gameEngine.add(this.createHeader());
    this.gameEngine.add(this.createGameSelectionButton(200, ButtonName.Play));
    this.gameEngine.add(this.createActionButton(350, ButtonName.Settings));
    this.gameEngine.add(this.createActionButton(500, ButtonName.Help));
  }

  createHeader(): Actor {
    return new Label({
      text: 'CHECKERS',
      pos: vec(this.gameEngine.screen.center.x, 50),
      color: Color.White,
      font: PixelFont60px({shadow: {color: Color.Black}}),
    });
  }

  private createActionButton(offsetY: number, label: ButtonName): Actor {
    const button = this.createButton(offsetY, label);

    button.events.on(GameEvent.MenuButtonClicked, event =>
      this.gameEngine.gameEvents.emit(GameEvent.MenuButtonClicked, event)
    );

    return button;
  }

  private createGameSelectionButton(offsetY: number, label: ButtonName): Actor {
    const button = this.createButton(offsetY, label);

    button.events.on(GameEvent.MenuButtonClicked, () => this.showGameSelectionMenu());

    return button;
  }

  private showGameSelectionMenu() {
    const modal = new ModalWindow(this.gameEngine, {
      width: 800,
      height: 600,
    });

    modal.addEntity(this.createModalHeader());
    // TODO fix positions
    // modal.addEntity(this.createActionButton(0, ButtonName.CheckersRu), vec(0, 150));
    // modal.addEntity(this.createActionButton(450, ButtonName.CheckersRu));

    this.engine.add(modal);
  }

  createModalHeader(): Actor {
    return new Label({
      text: 'SELECT GAME',
      color: Color.White,
      font: PixelFont60px({shadow: {color: Color.Black}}),
    });
  }

  private createButton(offsetY: number, label: ButtonName): Actor {
    return new RoundedButton({
      width: 400,
      height: 100,
      radius: 10,
      pos: vec(this.gameEngine.screen.center.x, offsetY),
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
  }
}
