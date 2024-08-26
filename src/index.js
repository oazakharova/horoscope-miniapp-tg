import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.css';
import { store } from './redux/store';
import TelegramInit from './components/TelegramInit';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <TelegramInit />
  </Provider>
);
