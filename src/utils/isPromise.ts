
export function isPromise<T>(v: unknown): v is Promise<T> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return !!v && typeof v.then === 'function';
}
