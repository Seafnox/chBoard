import '../node_modules/normalize.css/normalize.css';
import './resources/main.css';
import { audio, loader, state, device, video, plugin, pool } from 'melonjs';
import { TitleStage } from "./gui/stages/TitleStage";
import { PlayStage } from "./gui/stages/PlayStage";
import { Player } from "./gui/renderables/Player";
import { DataManifest } from "./DataManifest";

device.onReady(() => {

  // initialize the display canvas once the device/browser is ready
  if (!video.init(window.innerWidth, window.innerHeight, {parent : "screen", scale : "auto"})) {
    alert("Your browser does not support HTML5 canvas.");
    return;
  }

  // Initialize the audio.
  audio.init("mp3,ogg");

  // allow cross-origin for image/texture loading
  loader.setOptions({crossOrigin: "anonymous"});

  // initialize the debug plugin in development mode.
  if (process.env.NODE_ENV !== 'production') {
    import("@melonjs/debug-plugin").then((debugPlugin) => {
      // automatically register the debug panel
      plugin.register(debugPlugin.DebugPanelPlugin, "debugPanel");
    });
  }

  // set and load all resources.
  loader.preload(DataManifest, () => {
    // set the user defined game stages
    state.set(state.MENU, new TitleStage());
    state.set(state.PLAY, new PlayStage());

    // add our player entity in the entity pool
    pool.register("mainPlayer", Player);

    // Start the game.
    state.change(state.PLAY, false);
  });
});
