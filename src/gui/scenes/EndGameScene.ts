import { Scene, Label, vec, Color, Actor, Vector, SceneActivationContext } from 'excalibur';
import { CheckersUnitOwner } from '../../engineCheckers/simple/commons/CheckersUnitOwner';
import { CheckersUnitType } from '../../engineCheckers/simple/commons/CheckersUnitType';
import { GameEngine } from '../engine/GameEngine';
import { GameEvent } from '../engine/GameEvent';
import { SystemActionEvent } from '../events/SystemActionEvent';
import { SystemName } from '../events/SystemName';
import { buildIconButton } from '../kit/builders/buildIconButton';
import { buildMainMenuButton } from '../kit/builders/buildMainMenuButton';
import { buildTurnUI } from '../kit/builders/buildTurnUI';
import { PixelFont60px } from '../PrepareFonts';
import { FontSize } from '../UiConstants';

export class EndGameScene extends Scene {
  get gameEngine(): GameEngine {
    return this.engine as GameEngine;
  }

  get screenCenter(): Vector {
    return this.gameEngine.screen.center;
  }

  onActivate(context: SceneActivationContext) {
    super.onActivate(context);

    if (!this.gameEngine.gameConfig) {
      alert(`GameConfig is not set. Please set it in.`);
      return;
    }

    if (!this.gameEngine.lastWinner) {
      alert(`LastWinner is not set. Please set it in.`);
      return;
    }

    this.add(this.createHeader());
    this.add(this.createWinnerText(vec(this.gameEngine.screen.center.x, 150), this.gameEngine.lastWinner as CheckersUnitOwner));
    this.add(buildTurnUI(vec(this.gameEngine.screen.center.x + 75, 180), this.gameEngine.lastWinner as CheckersUnitOwner, CheckersUnitType.King, false, FontSize.Big*1.1));
    this.add(buildMainMenuButton(this.screenCenter, 400, SystemName.Restart, this.emitSystemAction.bind(this)));
    this.add(buildIconButton(vec(this.gameEngine.screen.drawWidth - 150, 350), SystemName.Settings2, this.emitSystemAction.bind(this)));
    this.add(buildIconButton(vec(this.gameEngine.screen.drawWidth - 150, 500), SystemName.Help2, this.emitSystemAction.bind(this)));
  }

  onDeactivate(context: SceneActivationContext) {
    super.onDeactivate(context);

    this.actors.forEach(actor => actor.kill());
  }

  createHeader(): Actor {
    return new Label({
      text: SystemName.EndGame,
      pos: vec(this.gameEngine.screen.center.x, 50),
      color: Color.White,
      font: PixelFont60px({shadow: {color: Color.Black}}),
    });
  }

  createWinnerText(
    position: Vector,
    winner: CheckersUnitOwner
  ): Actor {
    return new Label({
      text: `WINNER IS   ${winner.toUpperCase()}`,
      pos: position,
      color: Color.White,
      font: PixelFont60px({shadow: {color: Color.Black}}),
    });
  }

  private emitSystemAction<T>(event: SystemActionEvent<T>) {
    this.gameEngine.gameEvents.emit(GameEvent.SystemAction, event);
  }
}
