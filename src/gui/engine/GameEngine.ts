import { Engine, EventEmitter } from 'excalibur';
import { Enumerable } from '../../engine/Enumerable';
import { GameProperty } from '../GameProperty';
import { GameEventMap } from './GameEvent';
import { PlayerConfig } from './PlayerConfig';
import { SerializedGameConfig } from 'src/engine/SerializedGameConfig';

export class GameEngine extends Engine {
  public gameConfig?: SerializedGameConfig;
  public lastWinner?: Enumerable;
  public playerConfig?: PlayerConfig;
  public readonly gameEvents = new EventEmitter<GameEventMap>();
  public readonly properties = new Map<GameProperty, string>();
}
