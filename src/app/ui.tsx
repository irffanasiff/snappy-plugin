import React, { useContext } from 'react';
import AppState from './context/AppState';
import AppContext from './context/app-context';
import Layout from './components/Layout';

import styles from './ui.module.scss';

const UI = ({}) => {
  const { isAuth } = useContext(AppContext);

  return (
    <div className={styles.container}>
      <AppState>
        <Layout />
      </AppState>
      <footer className={styles.center}>Powered by Stable Diffusion</footer>
    </div>
  );
};

export default UI;
