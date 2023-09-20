export class Runtime {
  onMessage(fn: (...args: any[]) => void) {
    chrome.runtime.onMessage.addListener(fn);
  }

  removeListener(fn: (...args: any[]) => void) {
    chrome.runtime.onMessage.removeListener(fn);
  }

  request(message: any) {
    return new Promise<any[]>(resolve => {
      const listener = (...args: any[]) => {
        resolve.apply(null, args);

        chrome.runtime.onMessage.removeListener(listener);
      };

      this.onMessage(listener);
      this.sendMessage(message);
    });
  }

  sendMessage(message: any) {
    chrome.runtime.sendMessage(message);
  }
}
