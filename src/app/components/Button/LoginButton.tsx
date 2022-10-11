import React, { useContext } from 'react';
import AppContext from '../../context/app-context';

import styles from './Button.module.scss';

interface ComponentProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: JSX.Element | string;
  secondary?: boolean;
}

const Button = ({ children }: ComponentProps) => {
  const { setIsAuth, loading, setLoading } = useContext(AppContext);

  const loginHandler = () => {
    //parent.postMessage({ pluginMessage: { type: 'login' } }, '*');
    // when authenticated -> setIsAuth(true);

    setLoading(true);
    // setTimeout(() => {
       setIsAuth(true);
    //   setLoading(false);
    // }, 1000);
  };

  return (
    <button onClick={loginHandler} className={`${styles.primary} ${styles.base}`}>
      {loading ? <i className="fa fa-circle-o-notch fa-spin" /> : children}
    </button>
  );
};

export default Button;
