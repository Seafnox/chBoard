import { SceneWithOptions, FadeInOut, Color } from 'excalibur';
import { CheckersScene } from './CheckersScene';
import { NotImplementedScene } from './NotImplemented';
import { WelcomeScene } from './WelcomeScene';

export enum SceneName {
  WelcomeScene = 'WelcomeScene',
  RussianCheckersScene = 'RussianCheckersScene',
  GameOverScene = 'GameOverScene',
  RatingScene = 'RatingScene',
  SettingsScene = 'SettingsScene',
  HelpScene = 'HelpScene',
  NoopScene = 'NoopScene',
}

export const defaultScene = SceneName.WelcomeScene;

export const defaultSceneTransition = {
  in: new FadeInOut({duration: 300, direction: 'in', color: Color.Black}),
  out: new FadeInOut({duration: 300, direction: 'out', color: Color.Black}),
}

export const sceneMap: Record<SceneName, SceneWithOptions> = {
  [SceneName.WelcomeScene]: {
    scene: WelcomeScene,
    transitions: defaultSceneTransition,
  },
  [SceneName.RussianCheckersScene]: {
    scene: CheckersScene,
    transitions: defaultSceneTransition,
  },
  [SceneName.GameOverScene]: {
    scene: NotImplementedScene,
    transitions: defaultSceneTransition,
  },
  [SceneName.RatingScene]: {
    scene: NotImplementedScene,
    transitions: defaultSceneTransition,
  },
  [SceneName.SettingsScene]: {
    scene: NotImplementedScene,
    transitions: defaultSceneTransition,
  },
  [SceneName.HelpScene]: {
    scene: NotImplementedScene,
    transitions: defaultSceneTransition,
  },
  [SceneName.NoopScene]: {
    scene: NotImplementedScene,
    transitions: defaultSceneTransition,
  },
}
