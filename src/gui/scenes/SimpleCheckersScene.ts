import { Scene, Actor, Label, vec, Color, Vector } from 'excalibur';
import { ActionChange } from '../../engine/actionChanges/ActionChange';
import { ActionChangeType } from '../../engine/actionChanges/ActionChangeType';
import { MoveActionChange } from '../../engine/actionChanges/MoveActionChange';
import { Game } from '../../engine/Game';
import { CheckersUnitOwner } from '../../engineCheckers/simple/commons/CheckersUnitOwner';
import { CheckersAvailableAction, CheckersGame, CheckersGameConfig, CheckersUnit } from '../../engineCheckers/simple/ru/CheckersRuTypings';
import { SystemActionEvent } from '../events/SystemActionEvent';
import { SystemName } from '../events/SystemName';
import { GameEngine, GameEvent } from '../GameEngine';
import { ButtonLabel } from '../kit/ButtonLabel';
import { CheckersBoardElement } from '../kit/CheckersBoardElement';
import { borderSize, cellSize } from '../kit/CheckersConstants';
import { CheckersUnitElement } from '../kit/CheckersUnitElement';
import { CircleButton } from '../kit/CircleButton';
import { PixelFont60px } from '../PrepareFonts';

interface CircleButtonConfig {
  systemName: SystemName;
  diameter: number;
  pos: Vector;
  onClick?: (event: SystemActionEvent<CircleButton>) => void;
}

export class SimpleCheckersScene extends Scene {
  private isModalWindowOpen = false;
  private game?: CheckersGame;
  private boardView?: CheckersBoardElement;
  private unitViews: CheckersUnitElement[] = [];
  private selectedUnitView?: CheckersUnitElement;
  private selectedUnit?: CheckersUnit;
  private selectedUnitActionViews: CheckersUnitElement[] = [];

  get gameEngine(): GameEngine {
    return this.engine as GameEngine;
  }

  get topLeftPosition(): Vector {
    return this.boardView?.pos.add(vec(- (this.gameEngine.gameConfig?.width || 0) / 2 * cellSize, borderSize)) || vec(0,0);
  }

  onInitialize() {
    if (!this.gameEngine.gameConfig) {
      alert(`GameConfig is not set. Please set it in.`);
      return;
    }
    const gameConfig = this.gameEngine.gameConfig as CheckersGameConfig;

    this.game = new Game(this.gameEngine.gameConfig);
    this.boardView = this.createBoard(gameConfig, vec(this.gameEngine.screen.center.x, 120));
    this.unitViews = this.createUnits(this.game);

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

  createBoard(config: CheckersGameConfig, offset: Vector): CheckersBoardElement {
    return new CheckersBoardElement(config, offset);
  }

  private emitSystemAction(event: SystemActionEvent<CircleButton>) {
    if (!this.isModalWindowOpen) {
      this.gameEngine.gameEvents.emit(GameEvent.SystemAction, event);
    }
  }

  private createMenuButton(offsetY: number, label: SystemName, onClick: (event: SystemActionEvent<CircleButton>) => void): Actor {
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
      idleBackground: Color.Cyan,
      idleBorder: Color.Black,
      hoverBackground: Color.Blue,
      hoverBorder: Color.Black,
      pressedBackground: Color.Magenta,
      pressedBorder: Color.Black,
      onClick: config.onClick,
    });
  }

  private createUnits(game: CheckersGame): CheckersUnitElement[] {
    return game.board.units
      .map(unit => new CheckersUnitElement({
        cellSize: cellSize,
        cellLocation: unit.position,
        isActive: unit.actions.filter(action => action.isActive).length !== 0,
        topLeftPosition: this.topLeftPosition,
        unitColor: unit.owner === CheckersUnitOwner.White ? [Color.White, Color.LightGray] : [Color.Black, Color.DarkGray],
        hoverColor: Color.Gray,
        activeColor: Color.fromHex("#0080f077"),
        onClick: (event) => {
          console.log(this.constructor.name, 'onClick', unit.location);
          this.selectUnit(event, unit);
        },
      }));
  }

  // TODO make more optimized logic with comparion expected and actual game state with local changes
  private updateUnits() {
    this.unitViews.forEach(unitView => this.remove(unitView));
    this.unitViews = this.createUnits(this.game!);
    this.unitViews.forEach(unitView => this.add(unitView));
    this.selectUnit(undefined);
  }

  private selectUnit(event?: SystemActionEvent<CheckersUnitElement>, unit?: CheckersUnit) {
    if (this.selectedUnit === unit) {
      return;
    }

    if (this.isModalWindowOpen) {
      return;
    }

    this.selectedUnit = unit;
    this.selectedUnitView = event?.source;
    this.gameEngine.gameEvents.emit(GameEvent.UnitSelected, unit);

    this.unitViews.forEach(unitView => unitView.setSelected(this.selectedUnitView === unitView));
    this.updateActions();
  }

  private updateActions() {
    this.selectedUnitActionViews.forEach(actionView => this.remove(actionView));
    this.selectedUnitActionViews = [];

    if (!this.selectedUnit) {
      return;
    }

    this.selectedUnitActionViews = this.selectedUnit.actions
      .filter(action => action.isActive)
      .map(action => this.createActionView(action, this.selectedUnit!));
    this.selectedUnitActionViews.forEach(actionView => this.add(actionView));
  }

  private createActionView(action: CheckersAvailableAction, unit: CheckersUnit): CheckersUnitElement {
    const moveChange = action.changes
      .find((change: ActionChange<CheckersUnit>): change is MoveActionChange<CheckersUnit> => change.type === ActionChangeType.Move);

    if (!moveChange) {
      throw new Error('No move change');
    }
    const movePosition = moveChange.to;

    return new CheckersUnitElement({
      cellSize: cellSize,
      cellLocation: movePosition,
      isActive: true,
      topLeftPosition: this.topLeftPosition,
      unitColor: [Color.fromHex('#11aa6633'), Color.fromHex('#aaffaa33')],
      hoverColor: Color.fromHex('#11aa6666'),
      activeColor: Color.fromHex('#11aa6699'),
      onClick: () => {
        console.log(this.constructor.name, 'onClick', unit.location, movePosition);
        action.run();
        this.updateUnits();
      },
    });
  }
}
