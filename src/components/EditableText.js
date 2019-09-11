import React, { createRef, useState } from 'react';
import TextField from '@material-ui/core/TextField';

import { withStyles } from '@material-ui/core/styles';

const styles = {
  inheritStyles: {
    color: 'inherit',
    font: 'inherit',
    fontSize: 'inherit',
    wordSpacing: 'inherit',
    textTransform: 'inherit',
    textShadow: 'inherit',
    textAlign: 'inherit'
  }
};

const EditableText = ({
  classes,
  initialContent,
  changeCallback,
  submitCallback,
  disabled = false,
  id,
  ...rest
}) => {
  const [content, setContent] = useState(initialContent);

  const handleChange = e => {
    setContent(e.target.value || null);
    if (changeCallback) changeCallback(e, content, id);
  };
  const handleBlur = e => {
    if (submitCallback) submitCallback(e, content, id);
  };

  return (
    <React.Fragment>
      {disabled && content !== null && <span>{content}</span>}
      {!disabled && (
        <TextField
          InputProps={{ style: { ...styles.inheritStyles } }}
          value={content}
          disabled={disabled}
          onChange={handleChange}
          onBlur={handleBlur}
          variant="outlined"
          autoComplete="off"
          id={id}
          {...rest}
        />
      )}
    </React.Fragment>
  );
};

export default withStyles(styles)(EditableText);

/*
    <ContentEditable
      innerRef={contentEditable}
      html={content}
      disabled={disabled}
      onChange={handleChange}
      onBlur={handleBlur}
      tagName={tagName}
      id={id}
    />


    */
