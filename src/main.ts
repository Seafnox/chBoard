import '../node_modules/normalize.css/normalize.css';
import './resources/main.css';
import './resources/gui.css';

import { DisplayMode, vec } from 'excalibur';
import { GameEngine, GameEvent } from './gui/GameEngine';
import { GameProperty } from './gui/GameProperty';
import { ResourceLoader } from './gui/ResourceLoader';
import { SceneController } from './gui/SceneController';
import { sceneMap, defaultScene } from './gui/scenes/SceneMap';
import { calculatePixelConversion } from './gui/СalculatePixelConversion';

const engine = new GameEngine({
  canvasElementId: 'scene',
  width: 1600,
  height: 900,
  pixelArt: true,
  displayMode: DisplayMode.FitScreen,
  suppressConsoleBootMessage: true,
  suppressPlayButton: true,
  scenes: sceneMap,
});

engine.screen.events.on('resize', () => calculatePixelConversion(engine.screen));

engine.start(ResourceLoader)
  .then(() => engine.goToScene(defaultScene))
  .then(() => {
    calculatePixelConversion(engine.screen);

    engine.input.pointers.on('down', event => {
      const currentWorldPos = engine.screen.pageToWorldCoordinates(vec(event.pagePos.x, event.pagePos.y));
      engine.properties.set(GameProperty.PointerDownX, event.pagePos.x.toString());
      engine.properties.set(GameProperty.PointerDownY, event.pagePos.y.toString());
      engine.properties.set(GameProperty.WorldPointerDownX, currentWorldPos.x.toString());
      engine.properties.set(GameProperty.WorldPointerDownY, currentWorldPos.y.toString());
      engine.gameEvents.emit(GameEvent.PointerDown, event);
    });

    new SceneController(engine);
  })
  .catch(error => alert(`Unknown error: ${(error as Error).toString()}`));
