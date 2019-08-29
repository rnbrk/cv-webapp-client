import { useState } from 'react';
import axios from 'axios';

const useFileLoader = baseURL => {
  const [file, setFile] = useState(null);
  const instance = axios.create({ baseURL, timeout: 5000 });

  const getFile = async url => {
    try {
      const response = await instance({
        url,
        responseType: 'blob'
      });
      const blob = window.URL.createObjectURL(new Blob([response.data]));
      setFile(blob);
      console.log('blob', blob);
    } catch (e) {
      console.error(`Could not get file from ${baseURL}${url}`);
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

  return {
    file,
    get: getFile,
    delete: deleteFile
  };
};

export default useFileLoader;
