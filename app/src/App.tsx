import { useState } from 'react';

import { ActionsPanel } from './containers/ActionsPanel';
import { Header } from './components/Header';
import { StatePanel } from './containers/StatePanel';

import './App.scss';

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
