import ReactDOM from 'react-dom/client';
import App from './App';
import { StoreProvider } from './data/Store';

ReactDOM.createRoot(document.getElementById('app'))
  .render(
    <StoreProvider>
      <App />
    </StoreProvider>
  );
