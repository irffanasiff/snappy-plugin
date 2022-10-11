import React, { useContext, useState } from 'react';
import { LABEL } from '../../enums/enums';
import Profile from '../Profile/Index';
import Render from './Render/Render';
import AppContext from '../../context/app-context';
import Explore from './Explore/Explore';
import ImageTab from './Image/ImageTab';


import styles from './HomeLayout.module.scss';

const HomeLayout = () => {
  const [activeTab, setActiveTab] = useState(LABEL.HOME);
  const { isAuth } = useContext(AppContext);

  return (
    <div className={`${styles.container} ${styles.vStack}`}>
      <div className={`${styles.HStack} ${styles.fixed}`}>
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
            className={activeTab === LABEL.EXPLORE ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab(LABEL.EXPLORE)}
          >
            {LABEL.EXPLORE}
          </button>
        </ol>
        <Profile />
      </div>
      {activeTab === LABEL.HOME && <Render />}
      {activeTab === LABEL.IMAGE && <ImageTab />}
      {activeTab === LABEL.EXPLORE && <Explore />}
    </div>
  );
};

export default HomeLayout;
