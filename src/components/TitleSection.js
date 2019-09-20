import React, { useContext } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import EditableText from '../components/EditableText';
import EditModeContext from '../contexts/editMode';

const styles = {
  titleSection: {
    marginBottom: 64
  }
};

const TitleSection = ({ classes, title, Icon, setUpdates }) => {
  const [editMode] = useContext(EditModeContext);

  return (
    <Typography variant="h2" align="center" className={classes.titleSection}>
      <Icon color="primary" />
      <EditableText
        initialContent={title}
        submitCallback={setUpdates}
        disabled={!editMode}
        id="title"
        multiline
      />
    </Typography>
  );
};

export default withStyles(styles)(TitleSection);
