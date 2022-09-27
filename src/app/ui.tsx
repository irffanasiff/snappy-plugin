import React, { useContext, useEffect } from 'react';
import styles from './ui.module.scss';
import AppState from './context/AppState';
import AppContext from './context/app-context';
import Layout from './components/Layout';

const UI = ({}) => {
  const { isAuth } = useContext(AppContext);

  useEffect(() => {
    // This is how we read messages sent from the plugin controller
    window.onmessage = (event) => {
      const { type, message } = event.data.pluginMessage;
      if (type === 'create-rectangles') {
        console.log(`Figma Says: ${message}`);
      }
    };
  }, []);

  return (
    <div>
      <AppState>
        <Layout />
      </AppState>
      <footer className={styles.center}>Powered by Stability Diffusion</footer>
    </div>
  );
};

export default UI;
