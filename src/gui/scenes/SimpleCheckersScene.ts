import { Scene, Actor, Label, vec, Color, Vector, SceneActivationContext } from 'excalibur';
import { isMovingActonChange } from '../../engine/actionChanges/isMovingActonChange';
import { Game } from '../../engine/Game';
import { CheckersCellType } from '../../engineCheckers/simple/commons/CheckersCellType';
import { CheckersUnitOwner } from '../../engineCheckers/simple/commons/CheckersUnitOwner';
import { CheckersUnitType } from '../../engineCheckers/simple/commons/CheckersUnitType';
import { SwitchToKingActionChange } from '../../engineCheckers/simple/ru/actions/changes/SwitchToKingActionChange';
import { CheckersUnitAction, CheckersGame, CheckersGameConfig, CheckersUnit } from '../../engineCheckers/simple/ru/CheckersRuTypings';
import { GameEngine } from '../engine/GameEngine';
import { GameEvent } from '../engine/GameEvent';
import { SystemActionEvent } from '../events/SystemActionEvent';
import { SystemName } from '../events/SystemName';
import { buildIconButton } from '../kit/builders/buildIconButton';
import { buildTurnUI } from '../kit/builders/buildTurnUI';
import { CheckersBoardElement } from '../kit/CheckersBoardElement';
import { borderSize, cellSize, playerSchemes } from '../kit/CheckersConstants';
import { CheckersUnitElement } from '../kit/CheckersUnitElement';
import { CurrentTurnElement } from '../kit/CurrentTurnElement';
import { PixelFont60px } from '../PrepareFonts';

export class SimpleCheckersScene extends Scene {
  private isModalWindowOpen = false;
  private game?: CheckersGame;
  private turnUI?: CurrentTurnElement<CheckersUnitOwner, CheckersUnitType>;
  private boardView?: CheckersBoardElement<CheckersCellType, CheckersUnitType, CheckersUnitOwner>;
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

  onActivate(context: SceneActivationContext<unknown>) {
    super.onActivate(context);
    console.log(this.constructor.name, 'onActivate', context);


    if (!this.gameEngine.gameConfig) {
      alert(`GameConfig is not set. Please set it in.`);
      return;
    }
    const gameConfig = this.gameEngine.gameConfig as CheckersGameConfig;

    this.game = new Game(this.gameEngine.gameConfig);
    this.turnUI = buildTurnUI(vec(10, 100), this.game.activeOwner, CheckersUnitType.Checker);
    this.boardView = this.createBoard(gameConfig, vec(this.gameEngine.screen.center.x, 120));
    this.unitViews = this.createUnits(this.game);

    this.add(this.createHeader());
    this.add(this.turnUI);
    this.add(buildIconButton(vec(this.gameEngine.screen.drawWidth - 150, 350), SystemName.Settings2, this.emitSystemAction.bind(this)));
    this.add(buildIconButton(vec(this.gameEngine.screen.drawWidth - 150, 500), SystemName.Help2, this.emitSystemAction.bind(this)));

    this.add(this.boardView);
    this.unitViews.forEach(unitView => this.add(unitView));
  }

  onDeactivate(context: SceneActivationContext) {
    super.onDeactivate(context);

    this.actors.forEach(actor => actor.kill());
  }

  createHeader(): Actor {
    return new Label({
      text: SystemName.CheckersRu,
      pos: vec(this.gameEngine.screen.center.x, 50),
      color: Color.White,
      font: PixelFont60px({shadow: {color: Color.Black}}),
    });
  }

  createBoard(config: CheckersGameConfig, offset: Vector): CheckersBoardElement<CheckersCellType, CheckersUnitType, CheckersUnitOwner> {
    return new CheckersBoardElement(config, offset);
  }

  private emitSystemAction<T>(event: SystemActionEvent<T>) {
    this.gameEngine.gameEvents.emit(GameEvent.SystemAction, event);
  }

  private createUnits(game: CheckersGame): CheckersUnitElement[] {
    return game.board.units
      .map(unit => {
        const playerScheme = playerSchemes[unit.owner];
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
    if (this.game?.winner) {
      this.gameEngine.lastWinner = this.game.winner;
      this.gameEngine.gameEvents.emit(GameEvent.SystemAction, {
        systemName: SystemName.EndGame,
        source: this,
      });

      return;
    }

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

  private createActionView(action: CheckersUnitAction, unit: CheckersUnit): CheckersUnitElement {
    const moveChange = action.changes.find(isMovingActonChange);

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
        this.turnUI!.changePlayer(this.game!.activeOwner);
      },
    });
  }
}
