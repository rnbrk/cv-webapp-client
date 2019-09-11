import React, { createRef, useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import EditableText from '../components/EditableText';
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

const AboutMe = ({ classes, paragraph, setUpdates }) => {
  const [editMode] = useContext(EditModeContext);

  const requestUpdates = (e, content) => {
    const updates = { paragraph: content };
    setUpdates(updates);
  };

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
          <EditableText
            initialContent={paragraph}
            submitCallback={requestUpdates}
            disabled={!editMode}
            multiline
          />
        </Typography>
      )}
    </div>
  );
};

export default withStyles(styles)(AboutMe);
