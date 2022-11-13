import React, { useContext } from 'react';
import AppContext from '../../context/app-context';
import useLogout from '../../hooks/useLogout';

import styles from './Profile.module.scss';

const MenuOptions = () => {
  const { setPromptGuide, user } = useContext(AppContext);
  const on̵Logout = useLogout();

  return (
    <div className={styles.VStack}>
      <button className={styles.TryProButton} onClick={() => window.open('https://snappy-plugin.com/', '_blank')}>
        {user.isPro ? 'Open Profile' : 'Try pro for Free'}
      </button>
      <div className={`${styles.HStack}`}>
        <button className={styles.LinkButton}>Subscription</button>
        <div className={styles.tag}>{user.isPro ? 'Pro' : `${25 - user.num_images_generated}${' '}left`}</div>
      </div>
      <button className={styles.LinkButton} onClick={() => setPromptGuide(true)}>
        Prompt Guide
      </button>
      <button className={styles.LinkButton} onClick={on̵Logout}>
        Logout
      </button>
    </div>
  );
};

export default MenuOptions;
