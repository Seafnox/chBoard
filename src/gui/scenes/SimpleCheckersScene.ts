import { Scene, Actor, Label, vec, Color, Vector } from 'excalibur';
import { CheckersCellType } from '../../engineCheckers/simple/commons/CheckersCellType';
import { CheckersUnitOwner } from '../../engineCheckers/simple/commons/CheckersUnitOwner';
import { CheckersUnitType } from '../../engineCheckers/simple/commons/CheckersUnitType';
import { Game } from '../../engine/Game';
import { GameConfig } from '../../engine/GameConfig';
import { SystemActionEvent } from '../events/SystemActionEvent';
import { SystemName } from '../events/SystemName';
import { GameEngine, GameEvent } from '../GameEngine';
import { ButtonLabel } from '../kit/ButtonLabel';
import { CheckersBoard } from '../kit/CheckersBoard';
import { borderSize, cellSize } from '../kit/CheckersConstants';
import { CheckersUnit } from '../kit/CheckersUnit';
import { CircleButton } from '../kit/CircleButton';
import { KitColor } from '../kit/KitColor';
import { PixelFont60px } from '../PrepareFonts';

interface CircleButtonConfig {
  systemName: SystemName;
  diameter: number;
  pos: Vector;
  onClick?: (event: SystemActionEvent) => void;
}

export class SimpleCheckersScene extends Scene {
  private isModalWindowOpen = false;
  private game?: Game<CheckersCellType, CheckersUnitType, CheckersUnitOwner>;
  private boardView?: CheckersBoard;
  private unitViews: CheckersUnit[] = [];

  get gameEngine(): GameEngine {
    return this.engine as GameEngine;
  }

  onInitialize() {
    if (!this.gameEngine.gameConfig) {
      alert(`GameConfig is not set. Please set it in.`);
      return;
    }

    this.game = new Game(this.gameEngine.gameConfig);
    this.boardView = this.createBoard(this.gameEngine.gameConfig, vec(this.gameEngine.screen.center.x, 120));
    this.unitViews = this.createUnits(
      this.game,
      this.boardView.pos.add(vec(- this.gameEngine.gameConfig.width / 2 * cellSize, borderSize)),
    );

    this.add(this.createHeader());
    this.add(this.createMenuButton(350, SystemName.Settings2, this.emitSystemAction.bind(this)));
    this.add(this.createMenuButton(500, SystemName.Help2, this.emitSystemAction.bind(this)));

    this.add(this.boardView);
    this.unitViews.forEach(unitView => this.add(unitView));

  }

  createHeader(): Actor {
    return new Label({
      text: 'CHECKERS',
      pos: vec(this.gameEngine.screen.center.x, 50),
      color: Color.White,
      font: PixelFont60px({shadow: {color: Color.Black}}),
    });
  }

  createBoard(config: GameConfig<unknown, unknown, unknown>, offset: Vector): CheckersBoard {
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

  private createUnits(game: Game<unknown, unknown, unknown>, topLeftPosition: Vector): CheckersUnit[] {
    return game.board.units
      .map(unit => new CheckersUnit({
        cellSize: cellSize,
        cellLocation: unit.position,
        isActive: unit.actions.length !== 0,
        topLeftPosition: topLeftPosition,
        unitColor: unit.owner === CheckersUnitOwner.White ? [Color.White, Color.LightGray] : [Color.Black, Color.DarkGray],
        hoverColor: Color.Gray,
        onClick: this.emitSystemAction.bind(this),
      }));
  }
}
