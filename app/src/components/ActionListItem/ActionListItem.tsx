import { useContext } from 'react';

import { StoreContext } from '../../data/Store';

import './ActionListItem.scss';

export function ActionListItem({ item }) {
  const { setCurrentAction, currentAction } = useContext(StoreContext);
  const isActive = currentAction?.action.timestamp === item.action.timestamp;

  return (
    <div
      className={ "list-item " + (isActive && "selected") }
      onClick={ () => setCurrentAction(item) }
    >
      { item.action.type }
    </div>
  );
}
