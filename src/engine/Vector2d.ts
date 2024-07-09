import { canonicalizeAngle } from './utils/canonicalizeAngle';

/**
 * A 2D Vector2d on a plane.
 */
export class Vector2d {
  /**
   * A (0, 0) Vector2d
   */
  static get Zero(): Vector2d {
    return new Vector2d(0, 0);
  }

  /**
   * A (1, 1) Vector2d
   */
  static get One(): Vector2d {
    return new Vector2d(1, 1);
  }

  /**
   * A (0.5, 0.5) Vector2d
   */
  static get Half(): Vector2d {
    return new Vector2d(0.5, 0.5);
  }

  /**
   * A unit Vector2d pointing up (0, -1)
   */
  static get Up(): Vector2d {
    return new Vector2d(0, -1);
  }

  /**
   * A unit Vector2d pointing down (0, 1)
   */
  static get Down(): Vector2d {
    return new Vector2d(0, 1);
  }

  /**
   * A unit Vector2d pointing left (-1, 0)
   */
  static get Left(): Vector2d {
    return new Vector2d(-1, 0);
  }

  /**
   * A unit Vector2d pointing right (1, 0)
   */
  static get Right(): Vector2d {
    return new Vector2d(1, 0);
  }

  /**
   * Returns a Vector2d of unit length in the direction of the specified angle in Radians.
   */
  static fromAngle(angle: number): Vector2d {
    return new Vector2d(Math.cos(angle), Math.sin(angle));
  }

  /**
   * Checks if Vector2d is not null, undefined, or if any of its components are NaN or Infinity.
   */
  static isValid(vec: Vector2d): boolean {
    if (vec === null || vec === undefined) {
      return false;
    }
    if (isNaN(vec.x) || isNaN(vec.y)) {
      return false;
    }

    return !(vec.x === Infinity || vec.y === Infinity || vec.x === -Infinity || vec.y === -Infinity);
  }
  /**
   * Calculates distance between two Vectors
   */
  static distance(vec1: Vector2d, vec2: Vector2d): number {
    return Math.sqrt(Math.pow(vec1.x - vec2.x, 2) + Math.pow(vec1.y - vec2.y, 2));
  }

  static min(vec1: Vector2d, vec2: Vector2d): Vector2d {
    return new Vector2d(Math.min(vec1.x, vec2.x), Math.min(vec1.y, vec2.y));
  }

  static max(vec1: Vector2d, vec2: Vector2d): Vector2d {
    return new Vector2d(Math.max(vec1.x, vec2.x), Math.max(vec1.y, vec2.y));
  }

  static cross(num: number, vec: Vector2d): Vector2d {
    return new Vector2d(-num * vec.y, num * vec.x);
  }

  constructor(
    public x = 0,
    public y = 0,
  ) {}

  /**
   * Sets the x and y components at once, THIS MUTATES the current Vector2d. It is usually better to create a new Vector2d.
   * @warning **Be very careful using this, mutating Vector2ds can cause hard to find bugs**
   */
  setTo(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  /**
   * The distance to another Vector2d. If no other Vector2d is specified, this will return the [[magnitude]].
   */
  distance(vec: Vector2d = Vector2d.Zero) {
    const deltaX = this.x - vec.x;
    const deltaY = this.y - vec.y;
    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  }

  /**
   * The square distance to another Vector2d. If no other Vector2d is specified, this will return the [[squareMagnitude]].
   */
  squareDistance(vec: Vector2d = Vector2d.Zero) {
    const deltaX = this.x - vec.x;
    const deltaY = this.y - vec.y;
    return deltaX * deltaX + deltaY * deltaY;
  }

  /**
   * The size (magnitude) of the Vector2d
   */
  get size(): number {
    return this.distance();
  }

  /**
   * Setting the size mutates the current Vector2d
   * @warning Can be used to set the size of the Vector2d, **be very careful using this, mutating Vector2ds can cause hard to find bugs**
   */
  set size(newLength: number) {
    const vector = this.normalize().scale(newLength);
    this.setTo(vector.x, vector.y);
  }

  /**
   * Normalizes a Vector2d to have a magnitude of 1.
   */
  normalize() {
    const d = this.distance();
    if (d > 0) {
      return new Vector2d(this.x / d, this.y / d);
    }
    else {
      return new Vector2d(1, 0);
    }
  }

  /**
   * Returns the average (midpoint) between the current point and the specified
   */
  average(vec: Vector2d) {
    return this.add(vec).scale(0.5);
  }

  scale(sizeOrScale: number | Vector2d, dest?: Vector2d) {
    const result = dest || new Vector2d(0, 0);

    if (sizeOrScale instanceof Vector2d) {
      result.x = this.x * sizeOrScale.x;
      result.y = this.y * sizeOrScale.y;
    }
    else {
      result.x = this.x * sizeOrScale;
      result.y = this.y * sizeOrScale;
    }
    return result;
  }

  /**
   * Adds one Vector2d to another
   */
  add(v: Vector2d, dest?: Vector2d): Vector2d {
    if (dest) {
      dest.x = this.x + v.x;
      dest.y = this.y + v.y;
      return dest;
    }

    return new Vector2d(this.x + v.x, this.y + v.y);
  }

  /**
   * Subtracts a Vector2d from another, if you subtract Vector2d `B.sub(A)` the resulting Vector2d points from A -> B
   */
  sub(v: Vector2d): Vector2d {
    return new Vector2d(this.x - v.x, this.y - v.y);
  }

  /**
   * Adds one Vector2d to this one modifying the original
   * @warning Be very careful using this, mutating Vector2ds can cause hard to find bugs
   */
  addEqual(v: Vector2d): this {
    this.setTo(this.x + v.x, this.y + v.y);
    return this;
  }

  /**
   * Subtracts a Vector2d from this one modifying the original
   * @warning Be very careful using this, mutating Vector2ds can cause hard to find bugs
   */
  subEqual(v: Vector2d): this {
    this.setTo(this.x - v.x, this.y - v.y);
    return this;
  }

  /**
   * Scales this Vector2d by a factor of size and modifies the original
   * @warning Be very careful using this, mutating Vector2ds can cause hard to find bugs
   */
  scaleEqual(size: number): this {
    this.setTo(this.x * size, this.y * size);
    return this;
  }

  /**
   * Performs a dot product with another Vector2d
   */
  dot(v: Vector2d): number {
    return this.x * v.x + this.y * v.y;
  }

  cross(v: number | Vector2d) {
    if (v instanceof Vector2d) {
      return this.x * v.y - this.y * v.x;
    }
    else if (typeof v === 'number') {
      return new Vector2d(v * this.y, -v * this.x);
    }
  }

  /**
   * Returns the perpendicular Vector2d to this one
   */
  perpendicular(): Vector2d {
    return new Vector2d(this.y, -this.x);
  }

  /**
   * Returns the normal Vector2d to this one, same as the perpendicular of length 1
   */
  normal(): Vector2d {
    return this.perpendicular().normalize();
  }

  /**
   * Negate the current Vector2d
   */
  negate(): Vector2d {
    return this.scale(-1);
  }

  /**
   * Returns the angle of this Vector2d.
   */
  toAngle() {
    return canonicalizeAngle(Math.atan2(this.y, this.x));
  }

  /**
   * Rotates the current Vector2d around a point by a certain angle in radians.
   */
  rotate(angle: number, anchor: Vector2d = new Vector2d(0, 0)): Vector2d {
    const sinAngle = Math.sin(angle);
    const cosAngle = Math.cos(angle);
    const x = cosAngle * (this.x - anchor.x) - sinAngle * (this.y - anchor.y) + anchor.x;
    const y = sinAngle * (this.x - anchor.x) + cosAngle * (this.y - anchor.y) + anchor.y;
    return new Vector2d(x, y);
  }

  /**
   * Creates new Vector2d that has the same values as the previous.
   */
  clone(dest: Vector2d): Vector2d {
    const v = dest !== null && dest !== void 0 ? dest : new Vector2d(0, 0);
    v.x = this.x;
    v.y = this.y;
    return v;
  }

  /**
   * Returns a string representation of the Vector2d.
   */
  toString(fixed: number): string {
    if (fixed) {
      return `(${this.x.toFixed(fixed)}, ${this.y.toFixed(fixed)})`;
    }
    return `(${this.x}, ${this.y})`;
  }
}
