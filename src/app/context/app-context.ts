import { createContext } from 'react';

const AppContext = createContext({
  isAuth: false,
  setIsAuth: (value: boolean) => {},
  loading: false,
  setLoading: (value: boolean) => {},
  loadingTime: 0,
  setLoadingTime: (value: number) => {},
  promptGuide: false,
  setPromptGuide: (value: boolean) => {},
});

export default AppContext;
