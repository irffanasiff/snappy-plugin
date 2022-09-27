import React, { useState } from 'react';
import AppContext from './app-context';

const AppState = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(false);

  return <AppContext.Provider value={{ isAuth, setIsAuth, loading, setLoading }}>{children}</AppContext.Provider>;
};

export default AppState;
