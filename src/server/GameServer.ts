import {PlayerGameClient} from '../client/PlayerGameClient';
import {Enumerable} from '../engine/Enumerable';
import {GameConfig} from '../engine/GameConfig';
import {ActionDto} from "../engine/dto/ActionDto";
import {GameServerRequestType} from "./GameServerRequestType";

export class GameServer<TCellType extends Enumerable, TUnitType extends Enumerable, TUnitOwner extends Enumerable> {
  private worker: Worker;
  private client?: PlayerGameClient<TCellType, TUnitType, TUnitOwner>;
  constructor() {
    this.worker = new Worker('./GameWorker.js', { type: 'module' });

    this.worker.onmessage = (event: MessageEvent) => {
      console.log(this.constructor.name, 'WorkerMessage', event.data);
    };
  }

  startServer(
    config: GameConfig<TCellType, TUnitType, TUnitOwner>,
    client: PlayerGameClient<TCellType, TUnitType, TUnitOwner>,
  ) {
    console.log(this.constructor.name, GameServerRequestType.StartGame, config, client);
    this.client = client;
    this.postMessage(GameServerRequestType.StartGame, config);
  }

  stopServer() {
    console.log(this.constructor.name, GameServerRequestType.StopGame);
    this.postMessage(GameServerRequestType.StopGame);
  }

  makeAction(action: ActionDto) {
    console.log(this.constructor.name, GameServerRequestType.MakeAction, action);
    this.postMessage(GameServerRequestType.MakeAction, action);
  }

  private postMessage<T extends object>(type: GameServerRequestType, data?: T) {
    this.worker.postMessage(new MessageEvent(type, data));
  }
}
