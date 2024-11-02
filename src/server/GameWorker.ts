import {Game} from "../engine/Game";
import {GameConfig} from "../engine/GameConfig";

let game: Game<any, any, any>;

self.onmessage = (event: MessageEvent) => {
  if (event.data && event.data.type === 'calculateSum') {
    const num1 = event.data.num1;
    const num2 = event.data.num2;
    const sum = num1 + num2;
    self.postMessage({ type: 'result', sum });
  }
};

function initializeGame(gameConfig: GameConfig<any, any, any>) {
  game = new Game(gameConfig);
}
