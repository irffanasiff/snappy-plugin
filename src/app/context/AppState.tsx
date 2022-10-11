import React, { useState } from 'react';
import AppContext from './app-context';

const AppState = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingTime, setLoadingTime] = useState(0);
  const [promptGuide, setPromptGuide] = useState(false)

  return (
    <AppContext.Provider value={{ isAuth, setIsAuth, loading, setLoading, loadingTime, setLoadingTime, promptGuide, setPromptGuide }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
