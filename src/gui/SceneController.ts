import { ButtonName } from './events/ButtonName';
import { GameEngine, GameEvent } from './GameEngine';
import { SceneName } from './scenes/SceneMap';

export class SceneController {
  private sceneMap: Partial<Record<ButtonName, SceneName>> = {
    [ButtonName.CheckersRu]: SceneName.RussianCheckersScene,
    [ButtonName.Settings]: SceneName.SettingsScene,
    [ButtonName.Help]: SceneName.HelpScene,
    [ButtonName.QuitGame]: SceneName.WelcomeScene,
    [ButtonName.NewGame]: SceneName.WelcomeScene,
  }

  constructor(
    private engine: GameEngine,
  ) {
    this.engine.gameEvents.on(GameEvent.MenuButtonClicked, event => {
      console.log(this.constructor.name, event.buttonName);
      if (event.buttonName === ButtonName.Back) {
        this.runBackScenario();
        return;
      }

      const sceneName = this.sceneMap[event.buttonName];
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
