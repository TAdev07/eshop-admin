import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { store } from './app/store';
import AppWrapper from 'shared/app/AppWrapper.tsx';
import './i18n.ts';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppWrapper store={store}>
      <App />
    </AppWrapper>
  </React.StrictMode>,
);
