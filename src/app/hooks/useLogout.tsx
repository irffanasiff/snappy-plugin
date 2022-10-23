import React, { useContext } from 'react';
import AppContext from '../context/app-context';

const useLogout = () => {
  const { setUser, setIsAuth } = useContext(AppContext);
  function onLogout() {
    setIsAuth(false);
    setUser(undefined);
    parent.postMessage({ pluginMessage: { type: 'logout' } }, '*');
  }
  return onLogout;
};

export default useLogout;
