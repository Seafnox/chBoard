import { Engine, EventEmitter } from 'excalibur';
import { GameConfig } from '../../engine/GameConfig';
import { GameProperty } from '../GameProperty';
import { GameEventMap } from './GameEvent';
import { PlayerConfig } from './PlayerConfig';

export class GameEngine extends Engine {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public gameConfig?: GameConfig<any, any, any>;
  public playerConfig?: PlayerConfig;
  public readonly gameEvents = new EventEmitter<GameEventMap>();
  public readonly properties = new Map<GameProperty, string>();
}
