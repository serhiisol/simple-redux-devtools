import { useState, createContext } from 'react';

const DEFAULT_NUMBER_OF_STORED_ACTIONS = 25;

export const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [maxLimit, setMaxLimit] = useState(DEFAULT_NUMBER_OF_STORED_ACTIONS);
  const [actions, setActions] = useState([]);
  const [currentAction, setCurrentAction] = useState();

  const state = {
    actions, setActions,
    maxLimit, setMaxLimit,
    currentAction, setCurrentAction,
  };

  return <StoreContext.Provider value={ state }>
    { children }
  </StoreContext.Provider>;
}
