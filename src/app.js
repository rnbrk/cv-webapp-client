import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import './scss/styles.scss';

import axios from 'axios';

import authContext from './contexts/auth';
import Authentication from './components/Authentication';
import { login } from './hooks/useAuthHandler';

const App = () => {
  const [credentials, setCredentials] = useState({
    email: 'ron@web.dev',
    password: '12345abc'
  });
  const [refreshToken, setRefreshToken] = useState(null);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const [data, setData] = useState(null);

  useEffect(() => {
    const useAuthHandler = async () => {
      const response = await login(credentials);
      setRefreshToken(response.data.refreshToken);
      setToken(response.data.token);
      setUser(response.data.user);

      console.log(response.data);
    };
    useAuthHandler();
  }, []);

  return (
    <authContext.Provider value={{ token, refreshToken, user }}>
      <Authentication />
    </authContext.Provider>
  );
};

const appElem = document.querySelector('.app');

ReactDOM.render(<App />, appElem);
