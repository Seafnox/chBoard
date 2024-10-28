self.onmessage = (event: MessageEvent) => {
  if (event.data && event.data.type === 'calculateSum') {
    const num1 = event.data.num1;
    const num2 = event.data.num2;
    const sum = num1 + num2;
    self.postMessage({ type: 'result', sum });
  }
};
