import { Scene, Actor, Label, vec, Color, Vector } from 'excalibur';
import { GameConfig } from '../../engine/GameConfig';
import { CheckersUnitOwner } from '../../engineCheckers/simple/commons/CheckersUnitOwner';
import { checkersRuConfig } from '../../engineCheckers/simple/ru/CheckersRuConfig';
import { GameEngine } from '../engine/GameEngine';
import { GameEvent } from '../engine/GameEvent';
import { PlayerConfig } from '../engine/PlayerConfig';
import { PlayerType } from '../engine/PlayerType';
import { SystemActionEvent } from '../events/SystemActionEvent';
import { SystemName } from '../events/SystemName';
import { buildIconButton } from '../kit/builders/buildIconButton';
import { buildMainMenuButton } from '../kit/builders/buildMainMenuButton';
import { CircleButton } from '../kit/CircleButton';
import { PixelFont60px } from '../PrepareFonts';

interface ComplexGameConfig {
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gameConfig: GameConfig<any, any, any>;
  playerConfig?: PlayerConfig;
}

export class CheckersSelectScene extends Scene {
  private availableCheckers: Partial<Record<SystemName, ComplexGameConfig>> = {
    [SystemName.CheckersRu]: {
      label: 'Russian Checkers',
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

  get screenCenter(): Vector {
    return this.gameEngine.screen.center;
  }

  onInitialize() {
    this.add(this.createHeader());

    Object.keys(this.availableCheckers).forEach((name, index) => {
      const systemName = name as SystemName;
      const config = this.availableCheckers[systemName]!;
      this.add(buildMainMenuButton(this.screenCenter, 200*(index+1), systemName, event => {
        this.gameEngine.gameConfig = config.gameConfig;
        this.gameEngine.playerConfig = config.playerConfig;
        this.emitSystemAction(event);
      }));
    });

    this.add(this.createRightSideButton(350, SystemName.Settings2, this.emitSystemAction.bind(this)));
    this.add(this.createRightSideButton(500, SystemName.Help2, this.emitSystemAction.bind(this)));
  }

  createHeader(): Actor {
    return new Label({
      text: SystemName.SelectCheckers,
      pos: vec(this.gameEngine.screen.center.x, 50),
      color: Color.White,
      font: PixelFont60px({shadow: {color: Color.Black}}),
    });
  }

  createRightSideButton(offsetY: number, systemName: SystemName, onClick: (event: SystemActionEvent<CircleButton>) => void): Actor {
    return buildIconButton(vec(this.gameEngine.screen.drawWidth - 150, offsetY), systemName, onClick);
  }

  private emitSystemAction<T>(event: SystemActionEvent<T>) {
    this.gameEngine.gameEvents.emit(GameEvent.SystemAction, event);
  }



}
