import { useState } from 'react';

/**
 * Can store and remove tokens from localStorage
 * @param {*} initialState
 */
const useTokenHandler = initialState => {
  const [token, setToken] = useState(initialState);

  const storeToken = token => {
    window.localStorage.setItem('token', token);
    setToken(token);
  };

  const removeTokens = () => {
    window.localStorage.clear();
    setToken(null);
  };

  return {
    token,
    storeToken,
    removeTokens
  };
};

export default useTokenHandler;
