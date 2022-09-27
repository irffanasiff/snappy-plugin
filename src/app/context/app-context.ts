import { createContext } from 'react';

const AppContext = createContext({
  isAuth: false,
  setIsAuth: (value: boolean) => {},
  loading: false,
  setLoading: (value: boolean) => {},
});

export default AppContext;
