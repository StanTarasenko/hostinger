// Modules
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

// Store
import { store } from './store/store.ts';

// Components
import App from './App';

// Styles
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
