import { Scene, Label, vec, Color, Actor, Vector } from 'excalibur';
import { GameEngine } from '../engine/GameEngine';
import { GameEvent } from '../engine/GameEvent';
import { SystemActionEvent } from '../events/SystemActionEvent';
import { SystemName } from '../events/SystemName';
import { buildMainMenuButton } from '../kit/builders/buildMainMenuButton';
import { PixelFont60px } from '../PrepareFonts';

export class WelcomeScene extends Scene {
  get gameEngine(): GameEngine {
    return this.engine as GameEngine;
  }

  get screenCenter(): Vector {
    return this.gameEngine.screen.center;
  }

  onInitialize() {
    this.add(this.createHeader());
    this.add(buildMainMenuButton(this.screenCenter, 200, SystemName.SelectCheckers, this.emitSystemAction.bind(this)));
    this.add(buildMainMenuButton(this.screenCenter, 350, SystemName.Settings, this.emitSystemAction.bind(this)));
    this.add(buildMainMenuButton(this.screenCenter, 500, SystemName.Help, this.emitSystemAction.bind(this)));
  }

  createHeader(): Actor {
    return new Label({
      text: 'CHECKERS',
      pos: vec(this.gameEngine.screen.center.x, 50),
      color: Color.White,
      font: PixelFont60px({shadow: {color: Color.Black}}),
    });
  }

  private emitSystemAction<T>(event: SystemActionEvent<T>) {
    this.gameEngine.gameEvents.emit(GameEvent.SystemAction, event);
  }
}
