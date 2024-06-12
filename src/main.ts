import '../node_modules/normalize.css/normalize.css';
import './resources/main.css';
import './resources/gui.css';

import { DisplayMode, vec } from 'excalibur';
import { GameEngine, GameEvent } from './gui/GameEngine';
import { GameProperty } from './gui/GameProperty';
import { ResourceLoader } from './gui/ResourceLoader';
import { ContextMenuController } from "./gui/ContextMenu";
import { UnitController } from './gui/UnitController';
import { calculateExPixelConversion } from './gui/СalculatePixelConversion';

const engine = new GameEngine({
  canvasElementId: 'scene',
  width: 800,
  height: 600,
  pixelArt: true,
  displayMode: DisplayMode.FitScreen
});


engine.screen.events.on('resize', () => calculateExPixelConversion(engine.screen));

engine.start(ResourceLoader).then(() => {
  calculateExPixelConversion(engine.screen);

  engine.currentScene.input.pointers.on('down', event => {
    const currentWorldPos = engine.screen.pageToWorldCoordinates(vec(event.pagePos.x, event.pagePos.y));
    engine.properties.set(GameProperty.PointerDownX, event.pagePos.x.toString());
    engine.properties.set(GameProperty.PointerDownY, event.pagePos.y.toString());
    engine.properties.set(GameProperty.WorldPointerDownX, currentWorldPos.x.toString());
    engine.properties.set(GameProperty.WorldPointerDownY, currentWorldPos.y.toString());
    engine.gameEvents.emit(GameEvent.PointerDown, event);
  });

  new ContextMenuController(engine);
  new UnitController(engine);
});
