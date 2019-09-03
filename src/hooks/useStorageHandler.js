import { useState } from 'react';

/**
 * Action creators
 */
export const storeItem = item => ({ type: 'STORE_ITEM', payload: item });
export const removeItem = () => ({ type: 'REMOVE_ITEM' });
// export const clearStorage = () => ({ type: 'CLEAR_STORAGE' });
export const setNewKey = key => ({ type: 'SET_KEY', payload: key });

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

  // function _clear() {
  //   if (typeof key === 'string') {
  //     window.localStorage.clear();
  //     setItem(null);
  //     console.log('CLEAR_STORAGE');
  //   }
  // }

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
