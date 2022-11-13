import React, { useEffect, useState } from 'react';
import Button from '../components/Button/LoginButton';
import LoginScreen1 from '../components/Login/LoginScreen1';
import LoginScreen2 from '../components/Login/LoginScreen2';
import LoginScreen3 from '../components/Login/LoginScreen3';

import styles from './login.module.scss';

const Login = () => {
  const [currentScreen, setCurrentScreen] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      if (currentScreen === 3) return setCurrentScreen(1);
      setCurrentScreen((prevState) => prevState + 1);
    }, 3000);
  }, [currentScreen]);

  return (
    <div className={`${styles.loginContainer} ${styles.container}`}>
      <div className={`${styles.vStack}  ${styles.loginContainer__spacing}`}>
        <div className={`${styles.background}`}>
          <svg width="320" height="252" viewBox="0 0 320 252" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="55.0544" y1="0.809204" x2="55.0544" y2="234.113" stroke="#BABABA" />
            <line x1="7.58008" y1="219.048" x2="316.945" y2="219.048" stroke="#BABABA" />
            <line x1="78.1252" y1="2.42231e-08" x2="78.1252" y2="233.304" stroke="#BABABA" />
            <line x1="6.46826" y1="196.662" x2="315.833" y2="196.662" stroke="#BABABA" />
            <line x1="99.2495" y1="2.42231e-08" x2="99.2495" y2="233.304" stroke="#BABABA" />
            <line x1="6.46826" y1="176.163" x2="315.833" y2="176.163" stroke="#BABABA" />
            <line x1="120.374" y1="2.42231e-08" x2="120.374" y2="233.304" stroke="#BABABA" />
            <line x1="6.46826" y1="155.665" x2="315.833" y2="155.665" stroke="#BABABA" />
            <line x1="141.499" y1="2.42231e-08" x2="141.499" y2="233.304" stroke="#BABABA" />
            <line x1="6.46826" y1="135.167" x2="315.833" y2="135.167" stroke="#BABABA" />
            <line x1="162.624" y1="2.42231e-08" x2="162.624" y2="233.304" stroke="#BABABA" />
            <line x1="6.46826" y1="114.668" x2="315.833" y2="114.668" stroke="#BABABA" />
            <line x1="183.748" y1="2.42231e-08" x2="183.748" y2="233.304" stroke="#BABABA" />
            <line x1="6.46826" y1="94.17" x2="315.833" y2="94.17" stroke="#BABABA" />
            <line x1="204.873" y1="2.42231e-08" x2="204.873" y2="233.304" stroke="#BABABA" />
            <line x1="6.46826" y1="73.6716" x2="315.833" y2="73.6716" stroke="#BABABA" />
            <line x1="225.997" y1="2.42231e-08" x2="225.997" y2="233.304" stroke="#BABABA" />
            <line x1="6.46826" y1="53.1734" x2="315.833" y2="53.1734" stroke="#BABABA" />
            <line x1="247.121" y1="2.42231e-08" x2="247.121" y2="233.304" stroke="#BABABA" />
            <line x1="6.46826" y1="32.675" x2="315.833" y2="32.675" stroke="#BABABA" />
            <line x1="268.246" y1="2.42231e-08" x2="268.246" y2="233.304" stroke="#BABABA" />
            <line x1="6.46826" y1="12.1766" x2="315.833" y2="12.1766" stroke="#BABABA" />
            <rect width="320" height="252" fill="url(#paint0_radial_434_1692)" />
            <defs>
              <radialGradient
                id="paint0_radial_434_1692"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(160 126) rotate(90) scale(126 160)"
              >
                <stop stopColor="white" stopOpacity="0.42" />
                <stop offset="0.947917" stopColor="white" />
              </radialGradient>
            </defs>
          </svg>
        </div>
        {currentScreen === 1 ? (
          <LoginScreen1 />
        ) : currentScreen === 2 ? (
          <LoginScreen2 />
        ) : currentScreen === 3 ? (
          <LoginScreen3 />
        ) : (
          <LoginScreen1 />
        )}
        <div className={styles.hStack}>
          <span
            // onClick={() => setCurrentScreen(1)}
            style={{ backgroundColor: currentScreen == 1 && 'black' }}
            className={styles.dotButton}
          />
          <span
            // onClick={() => setCurrentScreen(2)}
            style={{ backgroundColor: currentScreen == 2 && 'black' }}
            className={styles.dotButton}
          />
          <span
            // onClick={() => setCurrentScreen(3)}
            style={{ backgroundColor: currentScreen == 3 && 'black' }}
            className={styles.dotButton}
          />
        </div>
        <div className={styles.loginButton}>
          <Button>Login</Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
