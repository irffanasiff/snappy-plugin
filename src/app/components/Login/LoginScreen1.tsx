import styles from '../../screens/login.module.scss';

import React from 'react';
import Lottie from 'lottie-react';
//import animation from './SVG/Animation2.json';

const LoginScreen1 = () => {
  return (
    <div className={`${styles.vStack} ${styles.loginScreenTransform} `}>
      <div className={`${styles.center} `}>
        {/*<div style={{ border: '2px solid red', width: '10rem' }}>
           <ImageStack />  
        <Lottie animationData={animation} loop={true} />;  </div> */}
        <img src="./SVG/Animation2.gif" alt="" />
      </div>
      <div className={`${styles.center} ${styles.textContainer}`}>
        <h2 className={styles.loginHeading}>Generate Images with text</h2>
        <p className={styles.loginText}>
          Get copyright free ad assets without leaving your artboard with text prompts using artificial intelligence.
        </p>
      </div>
    </div>
  );
};

export default LoginScreen1;
