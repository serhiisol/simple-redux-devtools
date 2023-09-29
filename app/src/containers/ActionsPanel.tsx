import { useContext, useEffect } from 'react';

import { StoreContext } from '../data/Store';
import { ActionsList } from '../components/ActionsList';
import { TreeViewer } from '../components/Tree';
import { Empty } from '../components/Empty';

import { events } from '../services/events';

export function ActionsPanel() {
  const { currentAction, setCurrentAction } = useContext(StoreContext);

  function getActionObject() {
    const { timestamp, type, ...rest } = currentAction.action;

    return { type, ...rest };
  }

  useEffect(() => {
    if (currentAction && !currentAction.state) {
      events.getOne(currentAction).then(setCurrentAction);
    }
  }, [currentAction]);

  return (
    <>
      <ActionsList />

      <div className="content">
        { currentAction
          ? <>
            <div className="h-1/3">
              <TreeViewer json={ getActionObject() } options={ { expandFullscreen: true } } />
            </div>
            <div className="h-2/3">
              <TreeViewer json={ currentAction.state } options={ { expandFullscreen: true } } />
            </div>
          </>
          : <Empty />
        }
      </div>
    </>
  );
}
