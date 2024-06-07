const decoder = new TextDecoder("utf-8");

export function arrayBufferToString(buffer: ArrayBuffer): string {
  return decoder.decode(new Uint8Array(buffer));
}
