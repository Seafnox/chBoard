import { GameEvent } from './engine/GameEvent';
import { SystemActionEvent } from './events/SystemActionEvent';
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
    // TODO make restart logic for any games
    [SystemName.Restart]: SceneName.SimpleCheckersScene,
    [SystemName.NewGame]: SceneName.WelcomeScene,
    [SystemName.EndGame]: SceneName.EndGameScene,
  };

  constructor(
    private engine: GameEngine,
  ) {
    this.engine.gameEvents.on(GameEvent.SystemAction, (event) => {
      this.onSystemAction(event).catch(console.error);
    });
  }

  private async onSystemAction(event: SystemActionEvent<unknown>): Promise<void> {
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
