import { clear, getLast, getOne, store } from './storage.js';

export function send(message) {
  if (!message || !message.action || !message.state) {
    return;
  }

  if (message.action.type === '@ngrx/effects/init') {
    console.log('Clearing cache...');

    chrome.runtime.sendMessage({
      type: 'response::reset',
    });
  }

  const storageMessage = {
    action: message.action,
    state: message.state,
  };

  if (store(storageMessage)) {
    chrome.runtime.sendMessage({
      data: storageMessage,
      type: 'message',
    });
  }
};

export function onReset() {
  clear();
}

export function onGetOne(message) {
  chrome.runtime.sendMessage({
    type: 'response::get-one',
    data: getOne(message),
  });
}

export function onGetLast() {
  chrome.runtime.sendMessage({
    type: 'response::get-last',
    data: getLast(),
  });
}
