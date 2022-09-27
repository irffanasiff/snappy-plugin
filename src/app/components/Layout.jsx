import React, { useContext } from 'react';
import AppContext from '../context/app-context';
import Home from '../screens/Home';
import Login from '../screens/Login';

const Layout = () => {
  const { isAuth } = useContext(AppContext);
  return isAuth ? <Home /> : <Login />;
};

export default Layout;
