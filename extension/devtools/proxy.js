let port;

connect();

window.addEventListener('message', (message) => {
  if (message?.data) {
    try {
      port.postMessage(message.data);
    } catch (err) {
      connect();
    }
  }
});

function connect() {
  try {
    port = chrome.runtime.connect({ name: 'simple-redux-devtools' });
    port.onDisconnect.addListener(connect);

    port.onMessage.addListener(message => {
      if (message.type === 'request::log') {
        log(message.data);
      }
    });
  } catch (err) { }
}

function log(value) {
  if (value?.isError) {
    const error = new Error(value.message);

    error.stack = value.stack.join('\n');

    console.log(error)
  } else {
    console.log(value);
  }
}
