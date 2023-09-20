import { send, onReset, onGetOne, onGetLast } from './events.js';

let port;

(function connect() {
  try {
    chrome.runtime.onConnect.addListener(p => {
      port = p;
      p.onMessage.addListener(send);
    });

    chrome.runtime.onDisconnect.addListener(connect);
  } catch (err) {
    setTimeout(connect, 5000);
  }
}());

chrome.runtime.onMessage.addListener(message => {
  if (message.type === 'request::reset') {
    onReset();
  }

  if (message.type === 'request::get-one') {
    onGetOne(message.data);
  }

  if (message.type === 'request::get-last') {
    onGetLast();
  }

  if (message.type === 'request::log') {
    port.postMessage(message);
  }
});
