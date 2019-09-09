import React, { createRef, useContext, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import ContentEditable from 'react-contenteditable';

import EditModeContext from '../contexts/editMode';

const styles = {
  aboutme: {
    margin: '0 auto',
    marginTop: 32,
    borderTop: '1px solid #999999',
    paddingTop: 16,
    width: '70%'
  }
};

const AboutMe = ({ classes, paragraph }) => {
  const [html, setHtml] = useState(paragraph);
  const [editMode] = useContext(EditModeContext);
  const contentEditable = createRef();
  const handleChange = e => {
    // TODO: Remove all html??
    setHtml(e.target.value);
  };
  const handleBlur = () => console.log(html);

  return (
    <div>
      {paragraph && (
        <Typography
          variant="body1"
          align="center"
          className={classes.aboutme}
          component="div"
          gutterBottom
        >
          <ContentEditable
            innerRef={contentEditable}
            html={html} // innerHTML of the editable div
            disabled={!editMode} // use true to disable editing
            onChange={handleChange} // handle innerHTML change
            onBlur={handleBlur}
            tagName="div" // Use a custom HTML tag (uses a div by default)
          />
        </Typography>
      )}
    </div>
  );
};

export default withStyles(styles)(AboutMe);
