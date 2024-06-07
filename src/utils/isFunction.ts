// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(f: unknown): f is Function {
  return !!f && Object.prototype.toString.call(f) == '[object Function]';
}
