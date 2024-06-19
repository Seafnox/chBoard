import { Engine, EventEmitter, PointerEvent, Vector } from 'excalibur';
import { GameProperty } from './GameProperty';

export enum GameEvent {
  MenuButtonClicked = 'buttonclicked',
  PointerDown = 'pointerdown',
  AddUnit = 'addunit',
  RemoveUnit = 'removeunit',
}

export interface GameEventMap {
  [GameEvent.PointerDown]: PointerEvent,
  [GameEvent.AddUnit]: Vector,
  [GameEvent.RemoveUnit]: Vector,
}

export class GameEngine extends Engine {
  public readonly gameEvents = new EventEmitter<GameEventMap>();
  public readonly properties = new Map<GameProperty, string>();
}
