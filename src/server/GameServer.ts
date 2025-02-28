import { SerializedGameConfig } from 'src/engine/SerializedGameConfig';
import {PlayerGameClient} from '../client/PlayerGameClient';
import {ActionDto} from "../engine/dto/ActionDto";
import {GameServerRequestType} from "./GameServerRequestType";
import {GameServerResponseType} from "./GameServerResponseType";

export class GameServer {
  private worker: Worker;
  private client?: PlayerGameClient<any, any, any>;
  constructor() {
    this.worker = new Worker('./GameWorker.js', { type: 'module' });

    this.worker.onmessage = (event: MessageEvent) => {
      const { type, data } = event.data;
      
      switch (type as GameServerResponseType) {
        case GameServerResponseType.ActionChange:
          if (this.client) {
            this.client.onActionChange(data);
          }
          break;
        case GameServerResponseType.Error:
          console.error('Game Server Error:', data);
          break;
        default:
          console.warn('Unknown response type:', type);
      }
    };
  }

  startServer(
    config: SerializedGameConfig,
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
    this.worker.postMessage({ type, data });
  }
}
