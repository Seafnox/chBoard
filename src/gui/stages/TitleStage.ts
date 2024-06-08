import { Stage } from 'melonjs';

export class TitleStage extends Stage {
  /**
   *  action to perform on state change
   */
  onResetEvent() {
    // TODO
    console.error(new Error(`${this.constructor.name}#onResetEvent Not implemented`));
  }

  /**
   *  action to perform when leaving this screen (state change)
   */
  onDestroyEvent() {
    // TODO
    console.error(new Error(`${this.constructor.name}#onDestroyEvent Not implemented`));
  }
}
