import { createRoot } from 'react-dom/client';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import React from 'react';

import App from './components/App';
import { store } from './store';
import './index.scss';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <CssBaseline />
    <App />
  </Provider>,
  // </React.StrictMode>,
);
