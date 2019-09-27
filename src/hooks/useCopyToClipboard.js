import { useRef, useState } from 'react';

const useCopyToClipboard = (initialLabel, labelOnChange) => {
  const copyUrlRef = useRef(null);
  const [label, setLabel] = useState(initialLabel);

  const resetLabel = () => setLabel(initialLabel);

  const copyUrl = () => {
    copyUrlRef.current.select();
    document.execCommand('copy');

    if (labelOnChange) {
      setLabel(labelOnChange);
      setTimeout(resetLabel, 4000);
    }
  };

  return {
    label,
    inputRef: copyUrlRef,
    onFocus: copyUrl,
    onBlur: resetLabel
  };
};

export default useCopyToClipboard;
