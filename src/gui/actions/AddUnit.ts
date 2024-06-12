import { Scene, Vector, Actor, vec, Color } from 'excalibur';
import { IdleUnitAnimation } from '../PrepareSprites';

export class AddUnit {
  public static execute(
    scene: Scene,
    position: Vector,
  ) {

    const actor = new Actor({
      pos: position,
      scale: vec(2, 2),
      color: Color.Red
    });
    actor.graphics.use(IdleUnitAnimation);
    scene.add(actor);
  }
}
