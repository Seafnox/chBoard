import { Engine, EventEmitter, PointerEvent, Vector } from 'excalibur';
import { GameConfig } from '../engine/GameConfig';
import { SystemActionEvent } from './events/SystemActionEvent';
import { GameProperty } from './GameProperty';

export enum GameEvent {
  SystemAction = 'systemaction',
  UnitSelected = 'unitselected',
  PointerDown = 'pointerdown',
  // TODO Remove useless action
  AddUnit = 'addunit',
  // TODO Remove useless action
  RemoveUnit = 'removeunit',
}

export interface GameEventMap {
  [GameEvent.PointerDown]: PointerEvent,
  [GameEvent.AddUnit]: Vector,
  [GameEvent.RemoveUnit]: Vector,
  [GameEvent.SystemAction]: SystemActionEvent<any>,
}

export class GameEngine extends Engine {
  public gameConfig?: GameConfig<any, any, any>;
  public readonly gameEvents = new EventEmitter<GameEventMap>();
  public readonly properties = new Map<GameProperty, string>();
}
