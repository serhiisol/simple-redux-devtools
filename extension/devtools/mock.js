(function () {
  let replacer = (_key, value) => {
    const maxSize = 100;

    if (typeof value === 'string' && value.length > maxSize) {
      return `<replaced(${value.length})>`;
    }

    return value;
  };

  // Proudly generated :D
  const simpleOptimization = (value, key) => {
    if (value === null) {
      return 'null';
    }

    if (typeof value === 'function') {
      return 'function';
    }

    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        const clone = [...value];

        for (let i = 0; i < clone.length; i++) {
          clone[i] = simpleOptimization(clone[i], i);
        }

        return clone;
      } else {
        const clone = { ...value };

        for (const key in clone) {
          clone[key] = simpleOptimization(clone[key], key);
        }

        return clone;
      }
    }

    return replacer(key, value);
  };

  window.__REDUX_DEVTOOLS_EXTENSION__ = {
    connect() {
      return this;
    },

    init() { },

    send(action, state) {
      const message = {
        action: {
          ...simpleOptimization(action.action),
          timestamp: action.timestamp,
        },
        state: simpleOptimization(state),
      };

      window.postMessage(message, '*');
    },

    subscribe() { },

    unsubscribe() { },
  };
}());
