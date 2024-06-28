import { Scene, Label, vec, Color, Actor } from 'excalibur';
import { SystemName } from '../events/SystemName';
import { GameEvent, GameEngine } from '../GameEngine';
import { KitColor } from '../kit/KitColor';
import { ModalWindow } from '../kit/ModalWindow';
import { RoundedButton } from '../kit/RoundedButton';
import { ButtonLabel } from '../kit/ButtonLabel';
import { PixelFont60px } from '../PrepareFonts';

export class WelcomeScene extends Scene {
  private isModalWindowOpen = false;

  get gameEngine(): GameEngine {
    return this.engine as GameEngine;
  }

  onInitialize(engine: GameEngine) {
    this.engine = engine;
    this.gameEngine.add(this.createHeader());
    this.gameEngine.add(this.createGameSelectionButton(200, SystemName.Play));
    this.gameEngine.add(this.createActionButton(350, SystemName.Settings));
    this.gameEngine.add(this.createActionButton(500, SystemName.Help));
  }

  createHeader(): Actor {
    return new Label({
      text: 'CHECKERS',
      pos: vec(this.gameEngine.screen.center.x, 50),
      color: Color.White,
      font: PixelFont60px({shadow: {color: Color.Black}}),
    });
  }

  private createActionButton(offsetY: number, label: SystemName): Actor {
    const button = this.createButton(offsetY, label);

    button.events.on(GameEvent.MenuButtonClicked, event => {
      if (!this.isModalWindowOpen) {
        this.gameEngine.gameEvents.emit(GameEvent.MenuButtonClicked, event);
      }
    });

    return button;
  }

  private createGameSelectionButton(offsetY: number, label: SystemName): Actor {
    const button = this.createButton(offsetY, label);

    button.events.on(GameEvent.MenuButtonClicked, () => this.showGameSelectionMenu());

    return button;
  }

  private showGameSelectionMenu() {
    const modal = new ModalWindow(this.gameEngine, {
      systemName: SystemName.SelectGame,
      width: 800,
      height: 600,
      onOpen: () => {
        this.isModalWindowOpen = true;
      },
      onClose: () => {
        this.isModalWindowOpen = false;
      },
    });

    const button = this.createButton(0, SystemName.CheckersRu);

    button.events.on(GameEvent.MenuButtonClicked, event => {
      this.gameEngine.gameEvents.emit(GameEvent.MenuButtonClicked, event);
      modal.close();
    });


    modal.addEntity(this.createModalHeader());
    // TODO fix positions
    modal.addEntity(button, vec(0, 150));
    // modal.addEntity(this.createActionButton(450, SystemName.CheckersRu));

    modal.open();
  }

  createModalHeader(): Actor {
    return new Label({
      text: SystemName.SelectGame,
      color: Color.White,
      font: PixelFont60px({shadow: {color: Color.Black}}),
    });
  }

  private createButton(offsetY: number, label: SystemName): Actor {
    const width = 400;
    const height = 100;

    return new RoundedButton({
      systemName: label,
      width,
      height,
      radius: 10,
      pos: vec(this.gameEngine.screen.center.x, offsetY),
      subNodes: [{
        graphic: new ButtonLabel({ label }),
        offset: vec(width/2, height/2),
      }],
      idleBackground: KitColor.Cyan,
      idleBorder: KitColor.Black,
      hoverBackground: KitColor.Blue,
      hoverBorder: KitColor.Black,
      pressedBackground: KitColor.Pink,
      pressedBorder: KitColor.Black,
    });
  }
}
