import { Scene, Label, vec, Color, Actor } from 'excalibur';
import { SystemActionEvent } from '../events/SystemActionEvent';
import { SystemName } from '../events/SystemName';
import { GameEvent, GameEngine } from '../GameEngine';
import { ButtonLabel } from '../kit/ButtonLabel';
import { KitColor } from '../kit/KitColor';
import { ModalWindow } from '../kit/ModalWindow';
import { RoundedButton } from '../kit/RoundedButton';
import { PixelFont60px } from '../PrepareFonts';

export class WelcomeScene extends Scene {
  private isModalWindowOpen = false;

  get gameEngine(): GameEngine {
    return this.engine as GameEngine;
  }

  onInitialize(engine: GameEngine) {
    this.engine = engine;
    this.gameEngine.add(this.createHeader());
    this.gameEngine.add(this.createButton(200, SystemName.Play, this.showGameSelectionMenu.bind(this)));
    this.gameEngine.add(this.createButton(350, SystemName.Settings, this.emitSystemAction.bind(this)));
    this.gameEngine.add(this.createButton(500, SystemName.Help, this.emitSystemAction.bind(this)));
  }

  createHeader(): Actor {
    return new Label({
      text: 'CHECKERS',
      pos: vec(this.gameEngine.screen.center.x, 50),
      color: Color.White,
      font: PixelFont60px({shadow: {color: Color.Black}}),
    });
  }

  private emitSystemAction(event: SystemActionEvent) {
    if (!this.isModalWindowOpen) {
      this.gameEngine.gameEvents.emit(GameEvent.SystemAction, event);
    }
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

    const button = this.createButton(0, SystemName.CheckersRu, event => {
      this.gameEngine.gameEvents.emit(GameEvent.SystemAction, event);
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

  private createButton(offsetY: number, label: SystemName, onClick: (event: SystemActionEvent) => void): Actor {
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
      onClick,
    });
  }
}
