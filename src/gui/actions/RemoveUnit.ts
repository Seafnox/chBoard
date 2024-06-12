import { Scene, Vector } from 'excalibur';

export class RemoveUnit {
  public static execute(
    scene: Scene,
    position: Vector,
  ) {
    for (let actor of scene.actors) {
      if (actor.graphics.bounds.contains(position)) {
        actor.kill();
      }
    }
  }
}
