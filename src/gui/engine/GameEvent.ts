import { PointerEvent } from 'excalibur';
import { SystemActionEvent } from '../events/SystemActionEvent';

export enum GameEvent {
  SystemAction = 'systemaction',
  PointerDown = 'pointerdown',
}

export interface GameEventMap {
  [GameEvent.PointerDown]: PointerEvent,
  [GameEvent.SystemAction]: SystemActionEvent<unknown>,
}
