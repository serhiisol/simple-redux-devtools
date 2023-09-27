import { useEffect, useState } from 'react';

import { TreeViewer } from '../components/Tree';
import { events } from '../services/events';

export function StatePanel() {
  const [lastAction, setLastAction] = useState(null);

  function loadLastAction() {
    events.getLast().then(setLastAction);
  }

  useEffect(() => {
    loadLastAction();
  }, []);

  return (
    <div className="content">
      <TreeViewer
        json={ lastAction?.state ?? {} }
        options={ {
          onRefresh: loadLastAction,
        } }
      />
    </div>
  );
}
