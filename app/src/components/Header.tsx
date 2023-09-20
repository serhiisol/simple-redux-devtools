import { useContext, KeyboardEvent } from 'react';

import { StoreContext } from '../data/Store';

export function Header({ onActions, onState, tab }) {
  const { setActions, setMaxLimit, maxLimit, setCurrentAction } = useContext(StoreContext);

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      setMaxLimit(parseInt(event.currentTarget.value));
    }
  }

  function reset() {
    setActions([]);
    setCurrentAction(null);
  }

  return (
    <div className="header">
      <button
        className={ "nav-button " + (tab === 'actions' && 'active') }
        onClick={ onActions }
      >
        Actions
      </button>

      <button
        className={ "nav-button " + (tab === 'state' && 'active') }
        onClick={ onState }
      >
        State
      </button>

      <span>Max Limit:</span>

      <input
        className="input-dark w-24"
        placeholder="Max Limit"
        defaultValue={ maxLimit }
        onKeyDown={ onKeyDown }
      />

      <button
        className="material-icons ml-auto"
        onClick={ () => reset() }>
        delete_forever
      </button>
    </div>
  );
}
