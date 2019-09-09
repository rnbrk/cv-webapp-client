import { useState } from 'react';

const useContentEditable = (initialContent, fn) => {
  const [textContent, setTextContent] = useState(initialContent);

  const onChange = e => {
    // e.preventDefault();
    console.log('change!');
    // setTextContent(e.target.value);
  };

  const onBlur = e => {
    console.log(e.target);
    fn(e, textContent);
  };

  return {
    contentEditable: true,
    onChange,
    onBlur
  };
};

export default useContentEditable;
