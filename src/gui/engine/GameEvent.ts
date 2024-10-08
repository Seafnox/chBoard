import { PointerEvent } from 'excalibur';
import { Unit } from '../../engine/Unit';
import { SystemActionEvent } from '../events/SystemActionEvent';

export enum GameEvent {
  SystemAction = 'systemaction',
  UnitSelected = 'unitselected',
  PointerDown = 'pointerdown',
}

export interface GameEventMap {
  [GameEvent.PointerDown]: PointerEvent,
  [GameEvent.SystemAction]: SystemActionEvent<unknown>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [GameEvent.UnitSelected]: Unit<any, any, any>,
}
