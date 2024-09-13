import { Scene, Actor, Label, vec, Color, Vector } from 'excalibur';
import { ActionChange } from '../../engine/actionChanges/ActionChange';
import { ActionChangeType } from '../../engine/actionChanges/ActionChangeType';
import { MovingActionChange } from '../../engine/actionChanges/MovingActionChange';
import { Game } from '../../engine/Game';
import { CheckersCellType } from '../../engineCheckers/simple/commons/CheckersCellType';
import { CheckersUnitOwner } from '../../engineCheckers/simple/commons/CheckersUnitOwner';
import { CheckersUnitType } from '../../engineCheckers/simple/commons/CheckersUnitType';
import { SwitchToKingActionChange } from '../../engineCheckers/simple/ru/actions/changes/SwitchToKingActionChange';
import { CheckersAvailableAction, CheckersGame, CheckersGameConfig, CheckersUnit } from '../../engineCheckers/simple/ru/CheckersRuTypings';
import { GameEngine } from '../engine/GameEngine';
import { GameEvent } from '../engine/GameEvent';
import { SystemActionEvent } from '../events/SystemActionEvent';
import { SystemName } from '../events/SystemName';
import { ButtonLabel } from '../kit/ButtonLabel';
import { CheckersBoardElement } from '../kit/CheckersBoardElement';
import { borderSize, cellSize } from '../kit/CheckersConstants';
import { CheckersUnitElement } from '../kit/CheckersUnitElement';
import { CircleButton } from '../kit/CircleButton';
import { PlayerColorScheme } from '../kit/ColorScheme';
import { CurrentTurnElement } from '../kit/CurrentTurnElement';
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
  private turnUI?: CurrentTurnElement<CheckersUnitOwner, CheckersUnitType>;
  private boardView?: CheckersBoardElement<CheckersCellType, CheckersUnitType, CheckersUnitOwner>;
  private unitViews: CheckersUnitElement[] = [];
  private selectedUnitView?: CheckersUnitElement;
  private selectedUnit?: CheckersUnit;
  private selectedUnitActionViews: CheckersUnitElement[] = [];
  private playerScheme: Record<CheckersUnitOwner, PlayerColorScheme<CheckersUnitType>> = {
    [CheckersUnitOwner.Black]: {
      [CheckersUnitType.Checker]: {
        unitColor: [Color.DarkGray, Color.DarkGray, Color.Black],
        hoverColor: Color.Gray,
        activeColor: Color.fromHex("#ffff4033"),
        pressedColor: Color.fromHex("#ffff40aa"),
      },
      [CheckersUnitType.King]: {
        unitColor: [Color.Black, Color.DarkGray, Color.Black],
        hoverColor: Color.Gray,
        activeColor: Color.fromHex("#ffff4033"),
        pressedColor: Color.fromHex("#ffff40aa"),
      },
    },
    [CheckersUnitOwner.White]: {
      [CheckersUnitType.Checker]: {
        unitColor: [Color.LightGray, Color.LightGray, Color.White],
        hoverColor: Color.Gray,
        activeColor: Color.fromHex("#ffff4033"),
        pressedColor: Color.fromHex("#ffff40aa"),
      },
      [CheckersUnitType.King]: {
        unitColor: [Color.White, Color.LightGray, Color.White],
        hoverColor: Color.Gray,
        activeColor: Color.fromHex("#ffff4033"),
        pressedColor: Color.fromHex("#ffff40aa"),
      },
    },

  }

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
    this.turnUI = this.createTurnUI(this.game.activeOwner);
    this.boardView = this.createBoard(gameConfig, vec(this.gameEngine.screen.center.x, 120));
    this.unitViews = this.createUnits(this.game);

    this.add(this.createHeader());
    this.add(this.turnUI);
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

  createTurnUI(currentPlayer: CheckersUnitOwner): CurrentTurnElement<CheckersUnitOwner, CheckersUnitType> {
    return new CurrentTurnElement<CheckersUnitOwner, CheckersUnitType>({
      cellSize: cellSize,
      initialPlayer: currentPlayer,
      position: vec(100, 100),
      playerScheme: this.playerScheme,
      unitType: CheckersUnitType.Checker,
    });
  }

  createBoard(config: CheckersGameConfig, offset: Vector): CheckersBoardElement<CheckersCellType, CheckersUnitType, CheckersUnitOwner> {
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
      .map(unit => {
        const playerScheme = this.playerScheme[unit.owner];
        const unitScheme = playerScheme[unit.type];

        return new CheckersUnitElement({
          cellSize: cellSize,
          cellLocation: unit.position,
          isActive: unit.actions.filter(action => action.isActive).length !== 0,
          topLeftPosition: this.topLeftPosition,
          unitColor: unitScheme.unitColor,
          hoverColor: unitScheme.hoverColor,
          pressedColor: unitScheme.pressedColor,
          activeColor: unitScheme.activeColor,
          onClick: (event) => {
            console.log(this.constructor.name, 'onClick', unit.location);
            this.selectUnit(event, unit);
          },
        });
      });
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
      .find((change: ActionChange<CheckersUnit>): change is MovingActionChange<CheckersUnit> => change.type === ActionChangeType.Move);

    if (!moveChange) {
      throw new Error('No move change');
    }
    const movePosition = moveChange.to;

    return new CheckersUnitElement({
      cellSize: cellSize,
      cellLocation: movePosition,
      isActive: true,
      topLeftPosition: this.topLeftPosition,
      unitColor: [
        unit.type === CheckersUnitType.King || SwitchToKingActionChange.isSuitable(this.game!, unit, movePosition)
          ? Color.fromHex('#11aa6666')
          : Color.fromHex('#aaffaa00'),
        Color.fromHex('#aaffaa33'),
        Color.fromHex('#11aa6633'),
      ],
      hoverColor: Color.fromHex('#11aa6666'),
      activeColor: Color.fromHex('#11aa6633'),
      onClick: () => {
        console.log(this.constructor.name, 'onClick', unit.location, movePosition);
        action.run();
        this.updateUnits();
        // FIXME fix turn view change
        this.turnUI!.changePlayer(this.game!.activeOwner);
      },
    });
  }
}
