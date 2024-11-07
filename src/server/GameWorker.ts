import {Game} from "../engine/Game";
import {GameConfig} from "../engine/GameConfig";
import {GameServerRequestType} from "./GameServerRequestType";
import {ActionDto} from "../engine/dto/ActionDto";
import {GameServerResponseType} from "./GameServerResponseType";

let game: Game<any, any, any> | undefined;

self.onmessage = (event: MessageEvent) => {
  console.log('Worker', event.type, event.data);
  if (event.data) {
    switch (event.type) {
      case GameServerRequestType.StartGame: start(event.data); break;
      case GameServerRequestType.StopGame: stop(); break;
      case GameServerRequestType.MakeAction: makeAction(event.data); break;

      // default: emit(GameServerResponseType.Error, `Unknown message type: '${event.type}' with data ${JSON.stringify(event.data)}`);
    }
  }
};

function start(gameConfig: GameConfig<any, any, any>) {
  game = new Game(gameConfig);
}

function stop() {
  game = undefined;
}

function makeAction(data: ActionDto) {
  if (!game) {
    emit(GameServerResponseType.Error, "Game is not started yet");
    return;
  }

  try {
    game.makeAction(data.id);

    const lastChanges = game.getLastActionChanges();
    lastChanges.forEach(change => {
      emit(GameServerResponseType.ActionChange, change);
    });
  } catch (error) {
    emit(GameServerResponseType.Error, error);
  }

}

function emit<T>(type: GameServerResponseType, data: T) {
  self.postMessage({type, data});
}
