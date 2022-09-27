import React, { useState } from 'react';
import styles from './HomeLayout.module.scss';
import { LABEL } from '../../enums/enums';
import Profile from '../Profile/Index';
import Render from './Render/Render';

const HomeLayout = () => {
  const [activeTab, setActiveTab] = useState(LABEL.HOME);

  return (
    <div className={styles.VStackContainer}>
      <div className={styles.HStack}>
        <ol className={styles.HStackTab}>
          <button
            className={activeTab === LABEL.HOME ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab(LABEL.HOME)}
          >
            {LABEL.HOME}
          </button>
          <button
            className={activeTab === LABEL.IMAGE ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab(LABEL.IMAGE)}
          >
            {LABEL.IMAGE}
          </button>
          <button
            className={activeTab === LABEL.LAB ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab(LABEL.LAB)}
          >
            {LABEL.LAB}
          </button>
        </ol>
        <Profile />
      </div>
      {activeTab === LABEL.HOME && <Render />}
      {activeTab === LABEL.IMAGE && <div>Image</div>}
      {activeTab === LABEL.LAB && <div>Lab</div>}
    </div>
  );
};

export default HomeLayout;
