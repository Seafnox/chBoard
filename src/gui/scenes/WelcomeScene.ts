import { Scene, Label, vec, Color, Actor, Vector } from 'excalibur';
import { SystemActionEvent } from '../events/SystemActionEvent';
import { SystemName } from '../events/SystemName';
import { GameEvent, GameEngine } from '../GameEngine';
import { ButtonLabel } from '../kit/ButtonLabel';
import { KitColor } from '../kit/KitColor';
import { ModalWindow } from '../kit/ModalWindow';
import { RoundedButton } from '../kit/RoundedButton';
import { PixelFont60px } from '../PrepareFonts';

interface CommonButtonConfig {
  systemName: SystemName;
  width: number;
  height: number;
  pos: Vector;
  onClick?: (event: SystemActionEvent) => void;
}

export class WelcomeScene extends Scene {
  private isModalWindowOpen = false;
  private availableCheckers: SystemName[] = [SystemName.CheckersRu];

  get gameEngine(): GameEngine {
    return this.engine as GameEngine;
  }

  onInitialize(engine: GameEngine) {
    this.engine = engine;
    this.gameEngine.add(this.createHeader());
    this.gameEngine.add(this.createMainMenuButton(200, SystemName.Play, this.showGameSelectionMenu.bind(this)));
    this.gameEngine.add(this.createMainMenuButton(350, SystemName.Settings, this.emitSystemAction.bind(this)));
    this.gameEngine.add(this.createMainMenuButton(500, SystemName.Help, this.emitSystemAction.bind(this)));
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
    if (this.isModalWindowOpen) {
      return;
    }

    const modalWidth = 800;
    const borderOffset = 5;
    const buttonWidth = (modalWidth - 2 * borderOffset);
    const modal = new ModalWindow(this.gameEngine, {
      systemName: SystemName.SelectGame,
      width: modalWidth,
      height: 600,
      onOpen: () => {
        this.isModalWindowOpen = true;
      },
      onClose: () => {
        this.isModalWindowOpen = false;
      },
    });

    const buttons = this.availableCheckers.map(label => {
      return this.createSelectionMenuButton(buttonWidth, label, event => {
        this.gameEngine.gameEvents.emit(GameEvent.SystemAction, event);
      });
    })


    modal.addEntity(this.createModalHeader());
    buttons.forEach((button, index) => {
      modal.addEntity(button, vec(-buttonWidth/2, 150 * (index + 1)));
    })

    modal.open();
  }

  createModalHeader(): Actor {
    return new Label({
      text: SystemName.SelectGame,
      color: Color.White,
      font: PixelFont60px({shadow: {color: Color.Black}}),
    });
  }

  private createMainMenuButton(offsetY: number, label: SystemName, onClick: (event: SystemActionEvent) => void): Actor {
    const width = 400;
    const height = 100;

    return this.createCommonButton({
      systemName: label,
      width,
      height,
      pos: vec(this.gameEngine.screen.center.x, offsetY),
      onClick,
    });
  }

  private createSelectionMenuButton(width: number, label: SystemName, onClick: (event: SystemActionEvent) => void): Actor {
    const height = 100;

    return this.createCommonButton({
      systemName: label,
      width,
      height,
      pos: vec(this.gameEngine.screen.center.x, 0),
      onClick,
    });
  }

  private createCommonButton(config: CommonButtonConfig): Actor {
    return new RoundedButton({
      systemName: config.systemName,
      width: config.width,
      height: config.height,
      radius: config.height/10,
      pos: config.pos,
      subNodes: [{
        graphic: new ButtonLabel({ label: config.systemName }),
        offset: vec(config.width/2, config.height/2),
      }],
      idleBackground: KitColor.Cyan,
      idleBorder: KitColor.Black,
      hoverBackground: KitColor.Blue,
      hoverBorder: KitColor.Black,
      pressedBackground: KitColor.Pink,
      pressedBorder: KitColor.Black,
      onClick: config.onClick,
    });
  }
}
