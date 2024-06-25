import { Engine, EventEmitter, PointerEvent, Vector } from 'excalibur';
import { MenuButtonClickedEvent } from './events/MenuButtonClickedEvent';
import { GameProperty } from './GameProperty';

export enum GameEvent {
  MenuButtonClicked = 'buttonclicked',
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
  [GameEvent.MenuButtonClicked]: MenuButtonClickedEvent,
}

export class GameEngine extends Engine {
  public readonly gameEvents = new EventEmitter<GameEventMap>();
  public readonly properties = new Map<GameProperty, string>();
}
