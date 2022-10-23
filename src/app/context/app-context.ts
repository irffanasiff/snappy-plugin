import { createContext } from 'react';
import { User } from '../../../typings/Definitions';

const AppContext = createContext({
  user: {} as User,
  setUser: (user: User) => {},
  isAuth: true,
  setIsAuth: (value: boolean) => {},
  loading: false,
  setLoading: (value: boolean) => {},
  loadingTimeTextToImage: 0,
  setLoadingTimeTextToImage: (value: number) => {},
  loadingTimeImageToImage: 0,
  setLoadingTimeImageToImage: (value: number) => {},
  promptGuide: false,
  setPromptGuide: (value: boolean) => {},
  multipleGenerations: false,
  setMultipleGenerations: (value: any) => {},
  fetchingData: false,
  setFetchingData: (value: boolean) => {},
});

export default AppContext;
