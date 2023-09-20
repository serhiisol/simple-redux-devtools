import { useContext, useEffect } from 'react';

import { StoreContext } from '../data/Store';
import { ActionsList } from '../components/ActionsList';
import { TreeViewer } from '../components/Tree';

import { events } from '../services/events';

export function ActionsPanel() {
  const { currentAction, setCurrentAction } = useContext(StoreContext);

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
              <TreeViewer json={ currentAction.action } options={ { expandFullscreen: true } } />
            </div>
            <div className="h-2/3">
              <TreeViewer json={ currentAction.state } options={ { expandFullscreen: true } } />
            </div>
          </>
          : <div className="flex h-full items-center justify-center text-8xl">
            ¯\_(ツ)_/¯
          </div>
        }
      </div>
    </>
  );
}
