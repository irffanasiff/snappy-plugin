import axios from 'axios';
import React, { useContext, useState } from 'react';
import Layout from './components/Layout';
import AppContext from './context/app-context';
import { User, UserResponse } from '../../typings/Definitions';
import styles from './ui.module.scss';

type event = { data: { pluginMessage: { type: string; data: any } } };

async function setUserData(setUser: (user: User) => void, _id: string, token: string) {
  // make http request to user
  await axios
    .get('https://snappysnappy.herokuapp.com/profile/' + _id, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      const userResponse = res.data;
      setUser({
        auth: true,
        _id: userResponse._id,
        username: userResponse.username,
        name: userResponse.name,
        email: userResponse.email,
        picture: userResponse.picture,
        isPro: userResponse.isPro,
        token: token,
      });
    })
    .catch((err) => {
      console.log('user fetch error -', err);
    });
}

const UI = () => {
  const { setIsAuth, setUser } = useContext(AppContext);
  const [spinner, setSpinner] = useState(true);
  window.onmessage = async (event: event) => {
    if (event.data.pluginMessage.type === 'authentication' && event.data.pluginMessage.data) {
      const _id = event.data.pluginMessage.data._id;
      const token = event.data.pluginMessage.data.token;
      setIsAuth(true);
      await setUserData(setUser, _id, token);
      setTimeout(() => {
        setSpinner(false);
      }, 2000);
    } else {
      setIsAuth(false);
      setSpinner(false);
    }
  };

  return (
    <div className={styles.container}>
      {spinner ? (
        <div
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh', width: '100vw' }}
        >
          <i className="fa fa-spinner fa-pulse" />
        </div>
      ) : (
        <Layout />
      )}
      <footer className={styles.center}>Powered by Stable Diffusion</footer>{' '}
    </div>
  );
};

export default UI;
