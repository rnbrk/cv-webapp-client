import { useState } from 'react';

/**
 * Stores and retrieves items from localStorage, can be passed around in a React app
 * @param {string} initialKey
 */
const useStorageHandler = () => {
  const [key, setKey] = useState(null);
  const [item, setItem] = useState(null);

  function _store(value) {
    if (typeof key === 'string') {
      window.localStorage.setItem(key, JSON.stringify(value));
      setItem(value);
      setKey(key);
      console.log('STORE_ITEM', key, value);
    }
  }

  function _remove() {
    if (typeof key === 'string') {
      window.localStorage.removeItem(key);
      setItem(null);
      console.log('REMOVE_ITEM', key);
    }
  }

  function _setKeyAndGetItem(key) {
    if (typeof key !== 'string' && key !== null) {
      throw new Error(`Key should be a string or null for no key, but it is ${typeof key}`);
    }

    setKey(key);
    setItem(JSON.parse(localStorage.getItem(key)));
    console.log('SET_KEY', key);
  }

  const dispatch = action => {
    switch (action.type) {
      case 'STORE_ITEM':
        _store(action.payload);
        break;
      case 'REMOVE_ITEM':
        _remove();
        break;
      case 'SET_KEY':
        _setKeyAndGetItem(action.payload);
        break;
      default:
        console.error(`${action.type} is not a valid action type`);
    }
  };

  return [item, dispatch];
};

export default useStorageHandler;
