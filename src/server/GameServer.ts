import {PlayerGameClient} from '../client/PlayerGameClient';
import {GameConfig} from '../engine/GameConfig';
import {ActionDto} from "../engine/dto/ActionDto";
import {GameServerRequestType} from "./GameServerRequestType";
import {GameServerResponseType} from "./GameServerResponseType";

export class GameServer {
  private worker: Worker;
  private client?: PlayerGameClient<any, any, any>;
  constructor() {
    this.worker = new Worker('./GameWorker.js', { type: 'module' });

    this.worker.onmessage = (event: MessageEvent) => {
      console.log(this.constructor.name, 'WorkerMessage', event.data);
      if (event.type === GameServerResponseType.ActionChange) {
        this.client?.onActionChange(event.data);
      }
    };
  }

  startServer(
    config: GameConfig<any, any, any>,
    client: PlayerGameClient<any, any, any>,
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
