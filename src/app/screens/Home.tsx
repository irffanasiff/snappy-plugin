import React, { useContext } from 'react';
import HomeLayout from '../components/home/HomeLayout';
import PromptGuide from '../components/PromptGuide/PromptGuide';
import AppContext from '../context/app-context';
import styles from './Home.module.scss';

const Home = () => {
  const { setPromptGuide, promptGuide } = useContext(AppContext);

  return (
    <div className={styles.container}>
      {promptGuide ? <PromptGuide setPromptGuide={setPromptGuide} /> : <HomeLayout />}
    </div>
  );
};

export default Home;
