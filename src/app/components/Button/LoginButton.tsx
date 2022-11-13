import React, { useContext } from 'react';
import AppContext from '../../context/app-context';
import { subscribe } from '../../lib/account';
import cryptoRandomString from 'crypto-random-string';

import styles from './Button.module.scss';

interface ComponentProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: JSX.Element | string;
  secondary?: boolean;
}
const code = cryptoRandomString({ length: 10, type: 'url-safe' });
console.log('random code - ', code);

const Button = ({ children }: ComponentProps) => {
  const { setIsAuth, loading, setLoading, setUser } = useContext(AppContext);

  const loginHandler = async () => {
    console.log('button clicked');
    setLoading(true);
    await subscribe(
      'https://snappysnappy.herokuapp.com/auth/' + code,
      (res, token) => {
        setIsAuth(true);
        setLoading(false);
        setUser({
          auth: true,
          _id: res.user._id,
          username: res.user.username,
          name: res.user.name,
          email: res.user.email,
          picture: res.user.picture,
          isPro: res.user.isPro,
          token: token,
          num_images_generated: res.user.num_images_generated,
        });
      },
      code
    );
    window.open('http://localhost:3000/login/' + code, '_blank');
  };

  return (
    <button
      onClick={!loading && loginHandler}
      className={`${styles.primary} ${styles.base}`}
      style={{ cursor: loading ? 'not-allowed !important' : '' }} //todo: this does not work look into it
    >
      {loading ? <i className="fa fa-circle-o-notch fa-spin" /> : children}
    </button>
  );
};

export default Button;
