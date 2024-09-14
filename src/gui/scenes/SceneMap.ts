import { SceneWithOptions, FadeInOut, Color } from 'excalibur';
import { CheckersSelectScene } from './CheckersSelectScene';
import { SimpleCheckersScene } from './SimpleCheckersScene';
import { NotImplementedScene } from './NotImplemented';
import { WelcomeScene } from './WelcomeScene';

export enum SceneName {
  WelcomeScene = 'WelcomeScene',
  CheckersSelectScene = 'CheckersSelectScene',
  SimpleCheckersScene = 'SimpleCheckersScene',
  GameOverScene = 'GameOverScene',
  RatingScene = 'RatingScene',
  SettingsScene = 'SettingsScene',
  HelpScene = 'HelpScene',
  NoopScene = 'NoopScene',
}

export const defaultScene = SceneName.WelcomeScene;

export const defaultSceneTransition = {
  in: new FadeInOut({duration: 200, direction: 'in', color: Color.Black}),
  out: new FadeInOut({duration: 200, direction: 'out', color: Color.Black}),
}

export const sceneMap: Record<SceneName, SceneWithOptions> = {
  [SceneName.WelcomeScene]: {
    scene: WelcomeScene,
    transitions: defaultSceneTransition,
  },
  [SceneName.CheckersSelectScene]: {
    scene: CheckersSelectScene,
    transitions: defaultSceneTransition,
  },
  [SceneName.SimpleCheckersScene]: {
    scene: SimpleCheckersScene,
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
