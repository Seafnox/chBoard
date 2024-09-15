import { GameEvent } from './engine/GameEvent';
import { SystemName } from './events/SystemName';
import { GameEngine } from './engine/GameEngine';
import { SceneName } from './scenes/SceneMap';

export class SceneController {
  private sceneMap: Partial<Record<SystemName, SceneName>> = {
    [SystemName.SelectCheckers]: SceneName.CheckersSelectScene,
    [SystemName.CheckersRu]: SceneName.SimpleCheckersScene,
    [SystemName.Settings]: SceneName.SettingsScene,
    [SystemName.Help]: SceneName.HelpScene,
    [SystemName.QuitGame]: SceneName.WelcomeScene,
    [SystemName.NewGame]: SceneName.WelcomeScene,
  };

  constructor(
    private engine: GameEngine,
  ) {
    this.engine.gameEvents.on(GameEvent.SystemAction, async (event) => {
      try {
        console.log(this.constructor.name, event.systemName);
        if (event.systemName === SystemName.Back) {
          await this.runBackScenario();
        } else {
          const sceneName = this.sceneMap[event.systemName];
          if (sceneName && sceneName !== this.currentSceneName) {
            await this.engine.goToScene(sceneName);
          } else {
            console.log(this.constructor.name, 'runNoopScenario');
            await this.engine.goToScene(SceneName.NoopScene);
          }
        }
      } catch (error) {
        throw error;
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
