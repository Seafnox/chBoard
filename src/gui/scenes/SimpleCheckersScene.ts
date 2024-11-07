import { Scene, Actor, Label, vec, Color, Vector, SceneActivationContext } from 'excalibur';
import { isMovingActonChange } from '../../engine/actionChanges/isMovingActonChange';
import { CheckersCellType } from '../../engineCheckers/simple/commons/CheckersCellType';
import { CheckersUnitOwner } from '../../engineCheckers/simple/commons/CheckersUnitOwner';
import { CheckersUnitType } from '../../engineCheckers/simple/commons/CheckersUnitType';
import {
  CheckersGameConfig,
  CheckersActionChange,
  CheckersUnitDto,
  CheckersBoardDto,
} from '../../engineCheckers/simple/ru/CheckersRuTypings';
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
import {GameServer} from "../../server/GameServer";
import {PlayerGameClient} from "../../client/PlayerGameClient";
import {Vector2d} from "../../engine/Vector2d";
import {ActionDto} from "../../engine/dto/ActionDto";

export class SimpleCheckersScene extends Scene implements PlayerGameClient<CheckersCellType, CheckersUnitType, CheckersUnitOwner> {
  private gameServer = new GameServer();
  private turnUI?: CurrentTurnElement<CheckersUnitOwner, CheckersUnitType>;
  private boardView?: CheckersBoardElement<CheckersCellType, CheckersUnitType, CheckersUnitOwner>;
  private unitViewMap: Record<string, CheckersUnitElement> = {};
  private selectedUnitId?: string;
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
    this.gameServer.startServer(gameConfig, this);

    this.add(this.createHeader());

    this.turnUI = buildTurnUI(vec(10, 100), CheckersUnitType.Checker);
    this.add(this.turnUI);

    this.add(buildIconButton(vec(this.gameEngine.screen.drawWidth - 150, 350), SystemName.Settings2, this.emitSystemAction.bind(this)));
    this.add(buildIconButton(vec(this.gameEngine.screen.drawWidth - 150, 500), SystemName.Help2, this.emitSystemAction.bind(this)));
  }

  onDeactivate(context: SceneActivationContext) {
    super.onDeactivate(context);

    this.gameServer.stopServer();
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

  onActionChange(action: CheckersActionChange) {
    console.log(this.constructor.name, 'onActionChange', action);
  }

  onSetActiveOwner(owner: CheckersUnitOwner) {
    this.turnUI!.changePlayer(owner);
  }

  onCreateBoard(boardData: CheckersBoardDto) {
    this.boardView = new CheckersBoardElement(boardData, vec(this.gameEngine.screen.center.x, 120));
    this.add(this.boardView);
  }

  onCreateUnit(unitData: CheckersUnitDto) {
    const playerScheme = playerSchemes[unitData.owner];
    const unitScheme = playerScheme[unitData.type];
    const unitPosition = new Vector2d(unitData.x, unitData.y);

    const unitView = new CheckersUnitElement({
      cellSize: cellSize,
      cellLocation: unitPosition,
      isActive: unitData.isActive,
      topLeftPosition: this.topLeftPosition,
      unitColor: unitScheme.unitColor,
      hoverColor: unitScheme.hoverColor,
      pressedColor: unitScheme.pressedColor,
      activeColor: unitScheme.activeColor,
      onClick: () => {
        console.log(this.constructor.name, 'onClickCheckersUnitElement', unitData.x, unitData.y);
        this.selectUnit(unitData);
      },
    });

    this.unitViewMap[unitData.id] = unitView;
    this.add(unitView);
  }

  onUpdateUnit(unitData: CheckersUnitDto) {
    const oldUnitView = this.unitViewMap[unitData.id];

    if (oldUnitView) this.remove(oldUnitView);

    this.onCreateUnit(unitData);

    this.selectUnit(undefined);
  }

  onEndGame(winner: string) {
    console.log(this.constructor.name, 'onEndGame', winner);
    this.gameEngine.lastWinner = winner;
    this.gameEngine.gameEvents.emit(GameEvent.SystemAction, {
      systemName: SystemName.EndGame,
      source: this,
    });
  }

  private emitSystemAction<T>(event: SystemActionEvent<T>) {
    this.gameEngine.gameEvents.emit(GameEvent.SystemAction, event);
  }

  private selectUnit(unitData?: CheckersUnitDto) {
    if (this.selectedUnitId === unitData?.id) {
      return;
    }

    const oldSelectedUnitView = this.selectedUnitId ? this.unitViewMap[this.selectedUnitId] : undefined;
    const newSelectedUnitView = unitData ? this.unitViewMap[unitData.id] : undefined;
    this.selectedUnitId = unitData?.id;

    if (oldSelectedUnitView) oldSelectedUnitView.setSelected(false);
    if (newSelectedUnitView) newSelectedUnitView.setSelected(true);

    this.updateActions(unitData);
  }

  private updateActions(unitData?: CheckersUnitDto) {
    this.selectedUnitActionViews.forEach(actionView => this.remove(actionView));
    this.selectedUnitActionViews = [];

    if (!unitData) {
      return;
    }

    this.selectedUnitActionViews = unitData.actions
      .filter(actionData => actionData.isActive)
      .map(actionData => this.createActionView(actionData, unitData));
    this.selectedUnitActionViews.forEach(actionView => this.add(actionView));
  }

  private createActionView(actionData: ActionDto, unitData: CheckersUnitDto): CheckersUnitElement {
    const moveChange = actionData.changes.find(isMovingActonChange);

    if (!moveChange) {
      throw new Error('No move change');
    }
    const movePosition = Vector2d.fromString(moveChange.to);

    return new CheckersUnitElement({
      cellSize: cellSize,
      cellLocation: movePosition,
      isActive: true,
      topLeftPosition: this.topLeftPosition,
      unitColor: [
        unitData.type === CheckersUnitType.King
          ? Color.fromHex('#11aa6666')
          : Color.fromHex('#aaffaa00'),
        Color.fromHex('#aaffaa33'),
        Color.fromHex('#11aa6633'),
      ],
      hoverColor: Color.fromHex('#11aa6666'),
      activeColor: Color.fromHex('#11aa6633'),
      onClick: () => {
        console.log(this.constructor.name, 'onClick', [unitData.x, unitData.y], movePosition);
        this.gameServer.makeAction(actionData);
      },
    });
  }
}
