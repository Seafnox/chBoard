import {Game} from "../engine/Game";
import {GameConfig} from "../engine/GameConfig";
import {GameServerRequestType} from "./GameServerRequestType";
import {ActionDto} from "../engine/dto/ActionDto";
import {GameServerResponseType} from "./GameServerResponseType";

type SomeGameConfig = GameConfig<any, any, any>;
let game: Game<any, any, any> | undefined;

self.onmessage = (event: MessageEvent) => {
  console.log('[INCOME]', event.type, event.data);
  if (event.data) {
    switch (event.type) {
      case GameServerRequestType.StartGame: start(event.data as SomeGameConfig); break;
      case GameServerRequestType.StopGame: stop(); break;
      case GameServerRequestType.MakeAction: makeAction(event.data as ActionDto); break;

      // default: emit(GameServerResponseType.Error, `Unknown message type: '${event.type}' with data ${JSON.stringify(event.data)}`);
    }
  }
};

function start(gameConfig: SomeGameConfig) {
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
  console.log('[OUTCOME]', type, data);
  self.postMessage({type, data});
}
