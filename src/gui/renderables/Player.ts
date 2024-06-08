import { Entity } from 'melonjs';
import { EntityConfig } from './EntityConfig';

export class Player extends Entity {

  constructor(x: number, y: number, settings: EntityConfig) {
    // call the parent constructor
    super(x, y, settings);
  }

  update(dt: number) {
    // change body force based on inputs
    //....
    // call the parent method
    return super.update(dt);
  }

  /* collision handler (called when colliding with other objects) */
  onCollision() {
    // Make all other objects solid
    return true;
  }
}
