export function getHtmlElementByIdOrThrow(id: string): HTMLElement {
  const result = document.getElementById(id);

  if (!result) {
    throw new Error(`Can't find DOM Element with id='${id}'`);
  }

  return result;
}
