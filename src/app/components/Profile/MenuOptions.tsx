import React from 'react';
import styles from './Profile.module.scss';

const MenuOptions = () => {
  return (
    <div className={styles.VStack}>
      <button className={styles.TryProButton}>Try pro for Free 🚀</button>
      <div className={`${styles.HStack}`}>
        <button className={styles.LinkButton}>Subscription</button>
        <div className={styles.tag}>Free</div>
      </div>
      <button className={styles.LinkButton}>About</button>
      <button className={styles.LinkButton}>Logout</button>
    </div>
  );
};

export default MenuOptions;
