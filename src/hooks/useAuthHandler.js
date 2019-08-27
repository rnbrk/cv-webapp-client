import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

const DOMAIN = `http://localhost:3000`;

function useAuthHandler(url = `${DOMAIN}/users/login`, credentials) {
  const [userProfile, setUserProfile] = useState(null);
  const [auth, setAuth] = useState(null);
  const [cvs, setCvs] = useState(null);

  async function login() {
    try {
      const response = await axios({
        url: `${DOMAIN}/users/login`,
        method: 'post',
        data: {
          ...credentials
        }
      });

      console.log(response.status, response.data);

      setUserProfile({ ...response.data.user });
      setAuth({
        refreshToken: response.data.refreshToken,
        token: response.data.token,
        _id: response.data.user._id,
        email: response.data.user.email
      });
      setCvs({ ...response.data.user.cvs });

      // saveRefreshToken
    } catch (e) {
      console.error(e);
    }
  }

  async function logout() {
    try {
      const response = await axios({
        url: `${DOMAIN}/users/logout`,
        method: 'post',
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      setAuth(null);

      console.log(response.status, response.data);

      return true;
    } catch (e) {
      throw new Error(e);
    }
  }

  async function logoutAll() {
    try {
      const response = await axios({
        url: `${DOMAIN}/users/logoutAll`,
        method: 'post',
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      setAuth(null);

      console.log(response.status, response.data);

      return true;
    } catch (e) {
      throw new Error(e);
    }
  }

  async function createAccount() {
    try {
      const response = await axios({
        url: `${DOMAIN}/users`,
        method: 'post',
        data: {
          ...credentials
        }
      });
      setUserProfile({ ...response.data.user });
      setAuth({
        refreshToken: response.data.refreshToken,
        token: response.data.token,
        _id: response.data.user._id,
        email: response.data.user.email
      });
      setCvs({ ...response.data.user.cvs });

      console.log(response.status, response.data);

      // saveRefreshToken
    } catch (e) {
      console.error(e);
    }
  }

  async function deleteAccount() {
    try {
      const response = await axios({
        url: `${DOMAIN}/users`,
        method: 'delete',
        headers: { Authorization: `Bearer ${auth.token}` }
      });
      setUserProfile(null);
      setAuth(null);
      setCvs(null);

      console.log(response.status, response.data);

      // deleteRefreshToken
    } catch (e) {
      console.error(e);
    }
  }

  async function updateAccount(data) {
    try {
      const response = await axios({
        url: `${DOMAIN}/users`,
        method: 'patch',
        headers: { Authorization: `Bearer ${auth.token}` },
        data
      });

      console.log(response.status, response.data);

      setUserProfile({
        ...userProfile,
        ...response.data.user
      });
      setAuth({ ...auth, email: response.data.email });
    } catch (e) {
      console.error(e);
    }
  }

  async function getToken() {
    let token = auth.token;

    if (_isValid(auth.token)) {
      console.log(`Token is valid. Here's ya token: ${auth.token}`);
      token = auth.token;
    }

    if (!_isValid(auth.token) && _isValid(auth.refreshToken)) {
      console.log(
        `Token ${auth.token} is not valid, but refreshToken ${auth.refreshToken} is. Refreshing access token...`
      );
      token = await _refreshAccessToken();
      console.log(`Here's ya token: ${token}`);
    } else {
      token = null;
    }

    setAuth({
      ...auth,
      token
    });

    return token;
  }

  /**
   * Decodes the payload of a JSON web token, then compares timestamp without now
   * @param {string} token - JSON web token
   * @param {string} prop - Name of object property with expiration time
   * @returns {boolean} - Whether token is still valid
   */
  function _isValid(token, prop = 'exp') {
    if (!token || typeof token !== 'string') {
      return false;
    }

    const [header, payload] = token.split('.');
    if (!payload) {
      return false;
    }

    const decoded = window.atob(payload);
    const parsed = JSON.parse(decoded);
    const expirationTime = moment.unix(parsed[prop]).utc();
    if (!expirationTime.isValid()) {
      return false;
    }

    return expirationTime.isAfter(moment().utc());
  }

  async function _refreshAccessToken() {
    try {
      const response = await axios({
        url: `${DOMAIN}/users/token`,
        method: 'post',
        headers: { Authorization: `Bearer ${auth.refreshToken}` },
        data: { email: credentials.email }
      });

      console.log(response.status, response.data);

      return response.data.token;
    } catch (e) {
      console.error(e);
      return new Error(e);
    }
  }

  return {
    userProfile,
    auth: {
      ...auth,
      login,
      logout,
      logoutAll,
      createAccount,
      deleteAccount,
      updateAccount,
      getToken
    },
    cvs
  };
}

export default useAuthHandler;
