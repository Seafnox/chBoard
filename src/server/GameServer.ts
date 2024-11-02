import { PlayerGameClient } from '../client/PlayerGameClient';
import { Enumerable } from '../engine/Enumerable';
import { GameConfig } from '../engine/GameConfig';
import {ActionDto} from "../engine/dto/ActionDto";

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

  stopServer() {
    console.log('stopSever');
  }

  makeAction(action: ActionDto) {
    console.log('makeAction', action);
    this.worker.postMessage(action);
  }
}
