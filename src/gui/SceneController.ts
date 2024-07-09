import { SystemName } from './events/SystemName';
import { GameEngine, GameEvent } from './GameEngine';
import { SceneName } from './scenes/SceneMap';

export class SceneController {
  private sceneMap: Partial<Record<SystemName, SceneName>> = {
    [SystemName.CheckersRu]: SceneName.SimpleCheckersScene,
    [SystemName.Settings]: SceneName.SettingsScene,
    [SystemName.Help]: SceneName.HelpScene,
    [SystemName.QuitGame]: SceneName.WelcomeScene,
    [SystemName.NewGame]: SceneName.WelcomeScene,
  }

  constructor(
    private engine: GameEngine,
  ) {
    // FIXME unhandled Promise exceptions
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    this.engine.gameEvents.on(GameEvent.SystemAction, event => {
      console.log(this.constructor.name, event.systemName);
      if (event.systemName === SystemName.Back) {
        return this.runBackScenario();
      }

      const sceneName = this.sceneMap[event.systemName];
      if (sceneName && sceneName !== this.currentSceneName) {
        return this.engine.goToScene(sceneName);
      } else {
        console.log(this.constructor.name, 'runNoopScenario');
        return this.engine.goToScene(SceneName.NoopScene);
      }
    });
  }

  private get currentSceneName(): SceneName {
    return this.engine.currentSceneName as SceneName;
  }

  private runBackScenario() {
    console.log(this.constructor.name, 'runBackScenario');

    if (this.currentSceneName !== SceneName.WelcomeScene) {
      return this.engine.goToScene(SceneName.WelcomeScene);
    }

    return this.engine.goToScene(SceneName.NoopScene);
  }
}
