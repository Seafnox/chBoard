import { Scene, Actor, Label, vec, Color, Vector } from 'excalibur';
import { GameConfig } from '../../engine/GameConfig';
import { SystemActionEvent } from '../events/SystemActionEvent';
import { SystemName } from '../events/SystemName';
import { GameEngine, GameEvent } from '../GameEngine';
import { ButtonLabel } from '../kit/ButtonLabel';
import { CheckersBoard } from '../kit/CheckersBoard';
import { CircleButton } from '../kit/CircleButton';
import { KitColor } from '../kit/KitColor';
import { PixelFont60px } from '../PrepareFonts';

interface CircleButtonConfig {
  systemName: SystemName;
  diameter: number;
  pos: Vector;
  onClick?: (event: SystemActionEvent) => void;
}

export class CheckersScene extends Scene {
  private isModalWindowOpen = false;

  get gameEngine(): GameEngine {
    return this.engine as GameEngine;
  }

  onInitialize(engine: GameEngine) {
    this.engine = engine;

    if (!this.gameEngine.gameConfig) {
      alert(`GameConfig is not set. Please set it in.`);
      return;
    }

    this.gameEngine.add(this.createHeader());
    this.gameEngine.add(this.createBoard(this.gameEngine.gameConfig, vec(this.gameEngine.screen.center.x, 120)));
    //this.gameEngine.add(this.createUnits(this.gameEngine.gameConfig));
    this.gameEngine.add(this.createMenuButton(350, SystemName.Settings2, this.emitSystemAction.bind(this)));
    this.gameEngine.add(this.createMenuButton(500, SystemName.Help2, this.emitSystemAction.bind(this)));

  }

  createHeader(): Actor {
    return new Label({
      text: 'CHECKERS',
      pos: vec(this.gameEngine.screen.center.x, 50),
      color: Color.White,
      font: PixelFont60px({shadow: {color: Color.Black}}),
    });
  }

  createBoard(config: GameConfig<unknown, unknown, unknown>, offset: Vector): Actor {
    return new CheckersBoard(config, offset);
  }

  private emitSystemAction(event: SystemActionEvent) {
    if (!this.isModalWindowOpen) {
      this.gameEngine.gameEvents.emit(GameEvent.SystemAction, event);
    }
  }

  private createMenuButton(offsetY: number, label: SystemName, onClick: (event: SystemActionEvent) => void): Actor {
    const diameter = 100;

    return this.createCommonButton({
      systemName: label,
      diameter,
      pos: vec(this.gameEngine.screen.drawWidth - diameter * 1.5, offsetY),
      onClick,
    });
  }

  private createCommonButton(config: CircleButtonConfig): Actor {
    return new CircleButton({
      systemName: config.systemName,
      radius: config.diameter / 2,
      borderSize: config.diameter / 20,
      pos: config.pos,
      subNodes: [{
        graphic: new ButtonLabel({
          width: config.diameter,
          height: config.diameter,
          label: config.systemName,
        }),
        offset: vec(config.diameter / 2, config.diameter / 2.5),
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
