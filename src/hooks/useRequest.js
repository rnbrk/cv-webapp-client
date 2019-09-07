import { useReducer, useState } from 'react';
import axios from 'axios';

export const initialState = {
  status: null,
  data: null
};

/**
 * Generates response object for component based on current state and server response
 * @param {object} state
 * @param {object} action
 * @returns {object} new state
 */
const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCHING':
      return { ...initialState, status: 'FETCHING' };
    case 'SUCCESS':
      return { ...state, status: 'SUCCESS', data: action.data };
    case 'FAILURE':
      return { ...state, status: 'ERROR', data: action.data };
    default:
      return state;
  }
};

/**
 * Action creators
 */
const fetching = () => ({ type: 'FETCHING' });
const success = data => ({ type: 'SUCCESS', data });
const failure = data => ({ type: 'FAILURE', data });

/**
 * Simple hook to make requests, can initialize with base url (domain)
 * and make requests with different urls and options
 */
const useRequest = (baseURL = '') => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const makeRequest = async (url, method = 'GET', options = {}) => {
    dispatch(fetching());
    try {
      const response = await axios({ baseURL, url, method, ...options });
      dispatch(success(response.data));
    } catch (e) {
      dispatch(failure(e));
    }
  };

  return [state, makeRequest];
};

export { useRequest as default, fetching, success, failure };
