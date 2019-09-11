import { useState, useReducer, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

import requestReducer from '../reducers/auth';

const initialRequest = {
  url: undefined,
  method: undefined,
  data: {},
  headers: {},
  timeout: 5000
};

const initialAuth = {
  _id: '',
  token: null,
  status: null
};

function useAuthHandler() {
  const [auth, setAuth] = useState(initialAuth);
  const [action, dispatch] = useReducer(requestReducer, initialRequest);
  const [refreshToken, setRefreshToken] = useState(null);

  // Starts request if action is made
  useEffect(() => {
    if (action.url !== undefined) {
      _makeRequest(action);
    }
  }, [action]);

  async function _makeRequest(action) {
    if (action === null) return;

    const req = { ...action };
    if (req.requiresToken) {
      req.headers = await _setHeaderIfAuthorized();
      delete req.requiresToken;
    }

    setAuth({ ...initialAuth, status: 'FETCHING' });

    try {
      const res = await axios(req);

      // LOG OUT
      const loggingOut = !res.data.user || !res.data.user._id;
      if (loggingOut) setAuth(initialAuth);

      // LOG IN OR UPDATING DATA
      if (!loggingOut) {
        if (res.data.refreshToken) setRefreshToken(res.data.refreshToken);

        const authData = _getAuthDataFromResponse(res);
        setAuth({ ...authData, status: 'SUCCESS' });
      }
    } catch (e) {
      setAuth({ ...initialAuth, status: 'FAILURE' });
    }
  }

  function _getAuthDataFromResponse(res) {
    return {
      email: res.data.user.email,
      _id: res.data.user._id,
      cvs: res.data.user.cvs,
      token: res.data.token ? res.data.token : auth.token
    };
  }

  async function _setHeaderIfAuthorized() {
    try {
      const token = await _getToken();
      if (!token) throw new Error();
      return { Authorization: `Bearer ${token}` };
    } catch (e) {
      setAuth({ ...initialAuth, status: 'FAILURE' });
    }
  }

  async function _getToken() {
    if (_isValid(auth.token)) {
      return auth.token;
    }

    if (!_isValid(auth.token) && _isValid(refreshToken)) {
      try {
        const res = await _refreshAccessToken();
        setAuth({ ...auth, token: res.token });
        setRefreshToken(res.refreshToken);
        return res.token;
      } catch (e) {
        return null;
      }
    }

    // !_isValid(refreshToken)
    setAuth(initialAuth);
    return null;
  }

  /**
   * Decodes the payload of a JSON web token, then compares timestamp without now
   * @param {string} token - JSON web token
   * @param {string} prop - Name of object property with expiration time
   * @returns {boolean} - Whether token is still valid
   */
  function _isValid(token, prop = 'exp') {
    if (!token || typeof token !== 'string') return false;

    const [header, payload] = token.split('.');
    if (!payload) return false;

    const decoded = window.atob(payload);
    const parsed = JSON.parse(decoded);
    const expirationTime = moment.unix(parsed[prop]).utc();

    if (!expirationTime.isValid()) return false;
    return expirationTime.isAfter(moment().utc());
  }

  async function _refreshAccessToken() {
    try {
      const req = {
        url: `${process.env.NODE_HOST}/users/token`,
        method: 'POST',
        headers: { Authorization: `Bearer ${refreshToken}` },
        data: { email: auth.email }
      };
      const res = await axios(req);
      return res.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  return [auth, dispatch];
}

export default useAuthHandler;
