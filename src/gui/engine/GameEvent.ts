import { PointerEvent, Vector } from 'excalibur';
import { Unit } from '../../engine/Unit';
import { SystemActionEvent } from '../events/SystemActionEvent';

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
  [GameEvent.SystemAction]: SystemActionEvent<unknown>,
  [GameEvent.UnitSelected]: Unit<any, any, any>,
  [GameEvent.AddUnit]: Vector,
  [GameEvent.RemoveUnit]: Vector,
}
