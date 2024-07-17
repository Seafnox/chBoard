import { Scene, Label, vec, Color, Actor, Vector } from 'excalibur';
import { GameConfig } from '../../engine/GameConfig';
import { CheckersUnitOwner } from '../../engineCheckers/simple/commons/CheckersUnitOwner';
import { checkersRuConfig } from '../../engineCheckers/simple/ru/CheckersRuConfig';
import { GameEngine } from '../engine/GameEngine';
import { GameEvent } from '../engine/GameEvent';
import { PlayerConfig } from '../engine/PlayerConfig';
import { PlayerType } from '../engine/PlayerType';
import { SystemActionEvent } from '../events/SystemActionEvent';
import { SystemName } from '../events/SystemName';
import { ButtonLabel } from '../kit/ButtonLabel';
import { ModalWindow } from '../kit/ModalWindow';
import { RoundedButton } from '../kit/RoundedButton';
import { PixelFont60px } from '../PrepareFonts';

interface CommonButtonConfig {
  systemName: SystemName;
  width: number;
  height: number;
  pos: Vector;
  onClick?: (event: SystemActionEvent<RoundedButton>) => void;
}

interface ComplexGameConfig {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gameConfig: GameConfig<any, any, any>;
  playerConfig?: PlayerConfig;
}

export class WelcomeScene extends Scene {
  private isModalWindowOpen = false;
  private preparedActors: Actor[] = [];
  private availableCheckers: Partial<Record<SystemName, ComplexGameConfig>> = {
    [SystemName.CheckersRu]: {
      gameConfig: checkersRuConfig,
      playerConfig: {
        [CheckersUnitOwner.Black]: PlayerType.Human,
        [CheckersUnitOwner.White]: PlayerType.Computer,
      },
    },
  };

  get gameEngine(): GameEngine {
    return this.engine as GameEngine;
  }

  onInitialize() {
    this.preparedActors.push(this.createHeader());
    this.preparedActors.push(this.createMainMenuButton(200, SystemName.Play, this.showGameSelectionMenu.bind(this)));
    this.preparedActors.push(this.createMainMenuButton(350, SystemName.Settings, this.emitSystemAction.bind(this)));
    this.preparedActors.push(this.createMainMenuButton(500, SystemName.Help, this.emitSystemAction.bind(this)));
  }

  onActivate() {
    this.preparedActors.forEach((actor) => {
      this.add(actor);
    });
  }

  onDeactivate() {
    this.preparedActors.forEach((actor) => {
      this.remove(actor);
    });
  }

  createHeader(): Actor {
    return new Label({
      text: 'CHECKERS',
      pos: vec(this.gameEngine.screen.center.x, 50),
      color: Color.White,
      font: PixelFont60px({shadow: {color: Color.Black}}),
    });
  }

  private emitSystemAction(event: SystemActionEvent<RoundedButton>) {
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

    const buttons = Object.entries(this.availableCheckers).map(([label, config]) => {
      return this.createSelectionMenuButton(buttonWidth, label as SystemName, event => {
        this.gameEngine.gameConfig = config.gameConfig;
        this.gameEngine.playerConfig = config.playerConfig;
        this.gameEngine.gameEvents.emit(GameEvent.SystemAction, event);
      });
    });

    modal.addEntity(this.createModalHeader());
    buttons.forEach((button, index) => {
      modal.addEntity(button, vec(-buttonWidth / 2, 150 * (index + 1)));
    });

    modal.open();
  }

  createModalHeader(): Actor {
    return new Label({
      text: SystemName.SelectGame,
      color: Color.White,
      font: PixelFont60px({shadow: {color: Color.Black}}),
    });
  }

  private createMainMenuButton(offsetY: number, label: SystemName, onClick: (event: SystemActionEvent<RoundedButton>) => void): Actor {
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

  private createSelectionMenuButton(width: number, label: SystemName, onClick: (event: SystemActionEvent<RoundedButton>) => void): Actor {
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
      radius: config.height / 10,
      pos: config.pos,
      subNodes: [{
        graphic: new ButtonLabel({
          width: config.width,
          height: config.height,
          label: config.systemName,
        }),
        offset: vec(config.width / 2, config.height / 2),
      }],
      idleBackground: Color.Cyan,
      idleBorder: Color.Black,
      hoverBackground: Color.Blue,
      hoverBorder: Color.Black,
      pressedBackground: Color.Magenta,
      pressedBorder: Color.Black,
      onClick: config.onClick,
    });
  }
}
