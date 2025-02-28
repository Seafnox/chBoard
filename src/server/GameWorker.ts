import {Game} from "../engine/Game";
import {GameServerRequestType} from "./GameServerRequestType";
import {ActionDto} from "../engine/dto/ActionDto";
import {GameServerResponseType} from "./GameServerResponseType";
import { createGameConfig } from '../engineCheckers/simple/ru/CheckersRuConfigFactory';
import { SerializedGameConfig } from 'src/engine/SerializedGameConfig';

let game: Game<any, any, any> | undefined;

self.onmessage = (event: MessageEvent) => {
  const { type, data } = event.data;
  
  switch (type) {
    case GameServerRequestType.StartGame:
      start(data);
      break;
    case GameServerRequestType.StopGame:
      stop();
      break;
    case GameServerRequestType.MakeAction:
      makeAction(data);
      break;
    default:
      emit(GameServerResponseType.Error, `Unknown request type: ${type}`);
  }
};

function start(serializedConfig: SerializedGameConfig) {
  const gameConfig = createGameConfig(serializedConfig);
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
  self.postMessage({ type, data });
}
