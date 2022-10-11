import React, { useContext } from 'react';
import styles from './Profile.module.scss';
import AppContext from '../../context/app-context';

const MenuOptions = () => {
  const { promptGuide, setPromptGuide } = useContext(AppContext);
  return (
    <div className={styles.VStack}>
      <button className={styles.TryProButton}>Try pro for Free 🚀</button>
      <div className={`${styles.HStack}`}>
        <button className={styles.LinkButton}>Subscription</button>
        <div className={styles.tag}>Free</div>
      </div>
      <button className={styles.LinkButton} onClick={() => setPromptGuide(true)}>
        Prompt Guide
      </button> 
      <button className={styles.LinkButton}>Logout</button>
    </div>
  );
};

export default MenuOptions;
