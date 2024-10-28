import { PlayerGameClient } from '../client/PlayerGameClient';
import { Action } from '../engine/Action';
import { Enumerable } from '../engine/Enumerable';
import { GameConfig } from '../engine/GameConfig';
import { InteractiveEntity } from '../engine/InteractiveEntity';

export class GameServer {
  private worker: Worker;
  constructor() {
    this.worker = new Worker('./GameWorker.js', { type: 'module' });
  }

  startServer<TCellType extends Enumerable, TUnitType extends Enumerable, TUnitOwner extends Enumerable>(
    config: GameConfig<TCellType, TUnitType, TUnitOwner>,
    client: PlayerGameClient<TCellType, TUnitType, TUnitOwner>,
  ) {
    console.log('startServer', config, client);

    this.worker.onmessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'result') {
        console.log(this.constructor.name, 'WorkerMessage', event.data);
      }
    };
  }

  stopSever() {
    console.log('stopSever');
  }

  makeAction<TCellType extends Enumerable, TUnitType extends Enumerable, TUnitOwner extends Enumerable, TInteractiveEntity extends InteractiveEntity<TCellType, TUnitType, TUnitOwner>>(
    action: Action<TCellType, TUnitType, TUnitOwner, TInteractiveEntity>
  ) {
    console.log('makeAction', action);
  }
}
