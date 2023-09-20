import { useContext, useRef, useEffect, useState, KeyboardEvent } from 'react';

import { StoreContext } from '../data/Store';
import { ActionListItem } from './ActionListItem';

import { events } from '../services/events';

export function ActionsList() {
  const { actions, setActions, maxLimit } = useContext(StoreContext);
  const [filter, setFilter] = useState('');

  const maxLimitRef = useRef(maxLimit);
  const actionsRef = useRef(actions);
  const scroll = useRef<HTMLDivElement>();

  const filteredActions = filter ? actions.filter(({ action }) =>
    action.type.toLowerCase().includes(filter)
  ) : actions;

  useEffect(() => {
    maxLimitRef.current = maxLimit;
  }, [maxLimit]);

  useEffect(() => {
    if (actions.length === 0) {
      actionsRef.current = [];
    }
  }, [actions]);

  useEffect(() => {
    events.subscribe(({ data: message }) => {
      const updatedActions = actionsRef.current.slice(-(maxLimitRef.current - 1));

      actionsRef.current = [...updatedActions, message];
      setActions(actionsRef.current);

      setTimeout(() => {
        if (scroll.current) {
          scroll.current.scrollTop = scroll.current.scrollHeight;
        }
      });
    });

    return () => {
      events.unsubscribe();
    };
  }, []);

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      setFilter(event.currentTarget.value.toLowerCase());
    }
  }

  return (
    <>
      <div className="header border-r border-b border-neutral-500">
        <input
          placeholder="Filter Action..."
          defaultValue={ filter }
          onKeyDown={ onKeyDown }
        />
      </div>

      <div
        className="sidebar border-r border-neutral-500"
        ref={ scroll }
      >
        { filteredActions.map((action, index) => <ActionListItem item={ action } key={ index } />) }
      </div>
    </>
  );
}
