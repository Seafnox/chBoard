import { Scene, Actor, Label, vec, Color, Vector } from 'excalibur';
import { GameConfig } from '../../engine/GameConfig';
import { SystemActionEvent } from '../events/SystemActionEvent';
import { SystemName } from '../events/SystemName';
import { GameEngine, GameEvent } from '../GameEngine';
import { ButtonLabel } from '../kit/ButtonLabel';
import { CheckersBoard } from '../kit/CheckersBoard';
import { KitColor } from '../kit/KitColor';
import { RoundedButton } from '../kit/RoundedButton';
import { PixelFont60px } from '../PrepareFonts';

interface CommonButtonConfig {
  systemName: SystemName;
  width: number;
  height: number;
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
    this.gameEngine.add(this.createBoard(this.gameEngine.gameConfig));
    //this.gameEngine.add(this.createUnits(this.gameEngine.gameConfig));
    this.gameEngine.add(this.createMenuButton(350, SystemName.Settings, this.emitSystemAction.bind(this)));
    this.gameEngine.add(this.createMenuButton(500, SystemName.Help, this.emitSystemAction.bind(this)));

  }

  createHeader(): Actor {
    return new Label({
      text: 'CHECKERS',
      pos: vec(this.gameEngine.screen.center.x, 50),
      color: Color.White,
      font: PixelFont60px({shadow: {color: Color.Black}}),
    });
  }

  createBoard(config: GameConfig<any, any, any>): Actor {
    return new CheckersBoard(config);
  }

  private emitSystemAction(event: SystemActionEvent) {
    if (!this.isModalWindowOpen) {
      this.gameEngine.gameEvents.emit(GameEvent.SystemAction, event);
    }
  }

  private createMenuButton(offsetY: number, label: SystemName, onClick: (event: SystemActionEvent) => void): Actor {
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
