import { useState } from 'react';
import axios from 'axios';

const useFileLoader = url => {
  const [file, setFile] = useState(null);

  const getFile = async () => {
    const response = await axios({
      url,
      method: 'get',
      responseType: 'blob'
    });
    const blob = window.URL.createObjectURL(new Blob([response.data]));
    setFile(blob);
  };

  return {
    file,
    get: getFile
  };
};

export default useFileLoader;
