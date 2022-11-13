import React from 'react';
import ReactDOM from 'react-dom/client';
import AppState from './context/AppState';
import UI from './ui';

import './styles/global.scss';

const container = document.getElementById('react-page');

// Create react_page.
const react_page = ReactDOM.createRoot(container);

react_page.render(
  <AppState>
    <UI />
  </AppState>
);
