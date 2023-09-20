const storage = new Map();

export function clear() {
  storage.clear();
}

export function getLast() {
  return Array.from(storage.values()).pop();
}

export function getOne(message) {
  const key = storageKey(message);

  return storage.get(key);
}

export function has(message) {
  const key = storageKey(message);

  return storage.has(key);
}

export function store(message) {
  const key = storageKey(message);

  if (has(message)) {
    return false;
  }

  storage.set(key, message);

  return true;
}

export function storageKey({ action }) {
  return action.type + action.timestamp;
}
