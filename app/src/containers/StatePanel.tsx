import { useEffect, useState } from 'react';

import { TreeViewer } from '../components/Tree';
import { events } from '../services/events';

export function StatePanel() {
  const [lastAction, setLastAction] = useState(null);

  useEffect(() => {
    events.getLast().then(setLastAction);
  }, []);

  return (
    <div className="content">
      <TreeViewer json={ lastAction?.state ?? {} } />
    </div>
  );
}
