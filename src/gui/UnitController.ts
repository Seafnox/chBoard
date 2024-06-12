import { AddUnit } from './actions/AddUnit';
import { RemoveUnit } from './actions/RemoveUnit';
import { GameEvent, GameEngine } from './GameEngine';

export class UnitController {
  constructor(
    private engine: GameEngine,
  ) {
    this.engine.gameEvents.on(GameEvent.AddUnit, position => {
      AddUnit.execute(this.engine.currentScene, position);
    });
    this.engine.gameEvents.on(GameEvent.RemoveUnit, position => {
      RemoveUnit.execute(this.engine.currentScene, position);
    });
  }
}
