import '../node_modules/normalize.css/normalize.css';
import './resources/main.css';
import './resources/gui.css';

import { DisplayMode, Engine } from "excalibur";
import { ResourceLoader } from './gui/ResourceLoader';
import { ContextMenuMVC, calculateExPixelConversion } from "./gui/ui";

const game = new Engine({
  canvasElementId: 'scene',
  width: 800,
  height: 600,
  pixelArt: true,
  displayMode: DisplayMode.FitScreen
});

game.screen.events.on('resize', () => calculateExPixelConversion(game.screen));

game.start(ResourceLoader).then(() => {
  calculateExPixelConversion(game.screen);
  new ContextMenuMVC(game.canvas.parentElement as HTMLElement, game.currentScene);
});
