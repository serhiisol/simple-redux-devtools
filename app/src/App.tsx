import { useState } from 'react';

import './App.scss';
import { ActionsPanel } from './containers/ActionsPanel';
import { Header } from './components/Header';
import { StatePanel } from './containers/StatePanel';

function App() {
  const [tab, setTab] = useState('actions');

  return (
    <div className="grid">
      <Header
        onActions={ () => setTab('actions') }
        onState={ () => setTab('state') }
        tab={ tab }
      />

      { tab === 'actions' && <ActionsPanel /> }
      { tab === 'state' && <StatePanel /> }
    </div>
  );
}

export default App;
