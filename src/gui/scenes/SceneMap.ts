import { SceneWithOptions, FadeInOut, Color } from 'excalibur';
import { NotImplementedScene } from './NotImplemented';
import { WelcomeScene } from './WelcomeScene';

export enum SceneName {
  WelcomeScene = 'WelcomeScene',
  PlayScene = 'PlayScene',
  GameOverScene = 'GameOverScene',
  RatingScene = 'RatingScene',
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
  [SceneName.PlayScene]: {
    scene: NotImplementedScene,
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
}
