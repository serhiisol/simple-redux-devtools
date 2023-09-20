import { Runtime } from './runtime';
import { RuntimeMock } from './runtime.mock';

interface Message {
  type: string;
  data: {
    action: object;
    state: object;
  };
}

class Events {
  private eventsFn: (...args: any[]) => void;
  private runtime = chrome.runtime ? new Runtime() : new RuntimeMock();

  async getLast() {
    const response = await this.runtime.request({
      type: 'request::get-last',
    });

    return response['data'];
  }

  async getOne(message: Message) {
    const response = await this.runtime.request({
      type: 'request::get-one',
      data: message,
    });

    return response['data'];
  }

  reset() {
    this.runtime.sendMessage({ type: 'request::reset' });
  }

  sendMessage(message: any) {
    this.runtime.sendMessage(message);
  }

  subscribe(fn: (message: Message) => void) {
    this.eventsFn = fn;
    this.runtime.onMessage(fn);
  }

  unsubscribe() {
    this.runtime.removeListener(this.eventsFn);
  }
}

export const events = new Events();
