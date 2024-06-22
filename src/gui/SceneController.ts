import { ButtonName } from './events/ButtonName';
import { GameEngine, GameEvent } from './GameEngine';
import { SceneName } from './scenes/SceneMap';

export class SceneController {
  private sceneMap: Record<ButtonName, SceneName> = {
    [ButtonName.Play]: SceneName.PlayScene,
    [ButtonName.Settings]: SceneName.SettingsScene,
    [ButtonName.Help]: SceneName.HelpScene,
    [ButtonName.QuitGame]: SceneName.WelcomeScene,
    [ButtonName.NewGame]: SceneName.PlayScene,
    [ButtonName.LoadGame]: SceneName.NoopScene,
    [ButtonName.Load]: SceneName.PlayScene,
    [ButtonName.Save]: SceneName.PlayScene,
    [ButtonName.Restart]: SceneName.PlayScene,

  }

  constructor(
    private engine: GameEngine,
  ) {
    this.engine.gameEvents.on(GameEvent.MenuButtonClicked, event => {
      console.log(this.constructor.name, event.buttonName);
      const sceneName = this.sceneMap[event.buttonName];
      if (sceneName && sceneName !== this.currentSceneName) {
        this.engine.goToScene(sceneName);
      }
    });
  }

  private get currentSceneName(): SceneName {
    return this.engine.currentSceneName as SceneName;
  }
}
