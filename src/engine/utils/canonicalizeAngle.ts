const TwoPI = Math.PI * 2;

/**
 * Convert an angle to be the equivalent in the range [0, 2PI]
 */
export function canonicalizeAngle(angle: number): number {
  let tmpAngle = angle;
  if (angle > TwoPI) {
    while (tmpAngle > TwoPI) {
      tmpAngle -= TwoPI;
    }
  }
  if (angle < 0) {
    while (tmpAngle < 0) {
      tmpAngle += TwoPI;
    }
  }
  return tmpAngle;
}
