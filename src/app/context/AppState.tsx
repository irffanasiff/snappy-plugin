import React, { useState } from 'react';
import AppContext from './app-context';
import { User } from '../../../typings/Definitions';

const AppState = ({ children }) => {
  const [isAuth, setIsAuth] = useState(true);

  const [user, setUser] = useState<User>({
    auth: false,
    _id: undefined,
    username: undefined,
    name: undefined,
    email: undefined,
    picture: undefined,
    isPro: false,
    token: undefined,
  });
  const [loading, setLoading] = useState(false);
  const [loadingTimeTextToImage, setLoadingTimeTextToImage] = useState(0);
  const [loadingTimeImageToImage, setLoadingTimeImageToImage] = useState(0);
  const [promptGuide, setPromptGuide] = useState(false);
  const [multipleGenerations, setMultipleGenerations] = useState(false);
  const [fetchingData, setFetchingData] = useState(false);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isAuth,
        setIsAuth,
        loading,
        setLoading,
        loadingTimeTextToImage,
        setLoadingTimeTextToImage,
        loadingTimeImageToImage,
        setLoadingTimeImageToImage,
        promptGuide,
        setPromptGuide,
        multipleGenerations,
        setMultipleGenerations,
        fetchingData,
        setFetchingData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
