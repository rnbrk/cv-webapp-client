import { useState } from 'react';

const useInputField = name => {
  const [value, setValue] = useState('');

  const onChange = e => {
    e.preventDefault();
    setValue(e.target.value);
  };

  return {
    name,
    value,
    onChange,
    placeholder: name
  };
};

export default useInputField;
