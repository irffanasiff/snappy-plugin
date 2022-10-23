import React from 'react';
import ReactDOM from 'react-dom';
import AppState from './context/AppState';
import UI from './ui';

import './styles/global.scss';

ReactDOM.render(
  <AppState>
    <UI />
  </AppState>,
  document.getElementById('react-page')
);
