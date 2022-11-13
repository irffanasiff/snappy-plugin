import React, { useState } from 'react';
import AppContext from './app-context';
import { User } from '../../../typings/Definitions';

const AppState = ({ children }) => {
  const [isAuth, setIsAuth] = useState(true);
  const [openModal, setOpenModal] = useState({
    isOpen: false,
    heading: undefined,
    content: undefined,
    button: {
      text: undefined,
      action: () => {},
    },
  });
  const [user, setUser] = useState<User>({
    auth: false,
    _id: undefined,
    username: undefined,
    name: undefined,
    email: undefined,
    picture: undefined,
    isPro: false,
    token: undefined,
    num_images_generated: 0,
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
        openModal,
        setOpenModal,
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
