import { SystemName } from './events/SystemName';
import { GameEngine, GameEvent } from './GameEngine';
import { SceneName } from './scenes/SceneMap';

export class SceneController {
  private sceneMap: Partial<Record<SystemName, SceneName>> = {
    [SystemName.CheckersRu]: SceneName.RussianCheckersScene,
    [SystemName.Settings]: SceneName.SettingsScene,
    [SystemName.Help]: SceneName.HelpScene,
    [SystemName.QuitGame]: SceneName.WelcomeScene,
    [SystemName.NewGame]: SceneName.WelcomeScene,
  }

  constructor(
    private engine: GameEngine,
  ) {
    this.engine.gameEvents.on(GameEvent.SystemAction, event => {
      console.log(this.constructor.name, event.systemName);
      if (event.systemName === SystemName.Back) {
        this.runBackScenario();
        return;
      }

      const sceneName = this.sceneMap[event.systemName];
      if (sceneName && sceneName !== this.currentSceneName) {
        this.engine.goToScene(sceneName);
      } else {
        console.log(this.constructor.name, 'runNoopScenario');
        this.engine.goToScene(SceneName.NoopScene);
      }
    });
  }

  private get currentSceneName(): SceneName {
    return this.engine.currentSceneName as SceneName;
  }

  private runBackScenario() {
    console.log(this.constructor.name, 'runBackScenario');

    if (this.currentSceneName !== SceneName.WelcomeScene) {
      this.engine.goToScene(SceneName.WelcomeScene);
      return;
    }

    this.engine.goToScene(SceneName.NoopScene);
  }
}
