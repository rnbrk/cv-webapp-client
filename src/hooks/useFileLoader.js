import { useState, useReducer } from 'react';
import axios from 'axios';

// const fileActionTypes = {
//   GET_FILE: 'GET_FILE',
//   DELETE_FILE: 'DELETE_FILE'
// };

// export const getFile = url => ({
//   type: fileActionTypes.GET_FILE,
//   payload: { url }
// });

// export const deleteFile = (url, token) => ({
//   type: fileActionTypes.DELETE_FILE,
//   payload: { url, token }
// });

// export const asyncDispatchMiddleware = dispatch =>
//  action => {
//   switch (action.type) {
//     case fileActionTypes.GET_FILE:
//       _getFile(action.payload.url)
//       .then(file => { dispatch({ ...action, file });});
//       break;
//     case fileActionTypes.DELETE_FILE:
//       _deleteFile(action.payload.url, action.payload.token)
//       .then(() => dispatch(action));
//     default:
//       return dispatch(action);
//   }
// };

// export const useFileReducer = baseURL => {
//   const reducer = async (state, action) => {
//     switch (action.type) {
//       case fileActionTypes.GET_FILE:
//         return action.file;
//       case fileActionTypes.DELETE_FILE:
//         return await _deleteFile(action.payload.url, action.payload.token);
//       default:
//         return state;
//     }
//   };

//   const _getFile = async url => {
//     try {
//       const response = await axios({
//         baseURL,
//         url,
//         method: 'get',
//         responseType: 'blob'
//       });
//       return window.URL.createObjectURL(new Blob([response.data]));
//     } catch (e) {
//       console.error(`Could not get file from ${baseURL}${url}`);
//       return null;
//     }
//   };

//   const _deleteFile = async (url, token) => {
//     try {
//       await axios({
//         url,
//         method: 'delete',
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       return null;
//     } catch (e) {
//       console.error(`Could not delete file from ${baseURL}${url}`);
//       return null;
//     }
//   };

//   const [state, dispatch] = useReducer(reducer, null);

//   return { state, dispatch };
// };

const useFileLoader = baseURL => {
  const [file, setFile] = useState(null);
  const instance = axios.create({ baseURL, timeout: 5000 });

  const getFile = async url => {
    try {
      const response = await instance({
        url,
        method: 'get',
        responseType: 'blob'
      });
      const blobURL = window.URL.createObjectURL(new Blob([response.data]));
      setFile(blobURL);
      return blobURL;
    } catch (e) {
      console.error(`Could not get file from ${baseURL}${url}`);
      return blobURL;
    }
  };

  const deleteFile = async (url, token) => {
    try {
      await instance({
        url,
        method: 'delete',
        headers: { Authorization: `Bearer ${token}` }
      });
      setFile(null);
    } catch (e) {
      console.error(e);
      // console.error(`Could not delete file from ${baseURL}${url}`);
    }
  };

  return [file, getFile, deleteFile];
};

export default useFileLoader;
