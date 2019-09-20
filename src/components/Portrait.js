import React, { createRef, useContext, useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { withStyles } from '@material-ui/core/styles';

import EditableText from '../components/EditableText';
import EditModeContext from '../contexts/editMode';

const styles = {
  portait: {
    margin: '0 auto',
    marginbottom: 32,
    margintop: 32
  },
  photo: {
    margin: '0 auto',
    marginBottom: 16,
    width: 120,
    height: 120
  },
  default: {
    display: 'block',
    margin: '0 auto',
    marginBottom: 16,
    fontSize: 120
  }
};

const Portrait = ({ classes, fullName, profession, photo, setUpdates }) => {
  const [editMode] = useContext(EditModeContext);
  return (
    <Box className={classes.portrait}>
      {photo ? (
        <Avatar alt="My photo" src={photo} className={classes.photo} />
      ) : (
        <AccountCircle className={classes.default} color="primary" />
      )}

      {fullName && (
        <Typography variant="h1" align="center">
          <EditableText
            initialContent={fullName}
            submitCallback={setUpdates}
            disabled={!editMode}
            id="fullName"
          />
        </Typography>
      )}

      {profession && (
        <Typography variant="subtitle1" align="center" color="primary" gutterBottom>
          <EditableText
            initialContent={profession}
            submitCallback={setUpdates}
            disabled={!editMode}
            id="profession"
          />
        </Typography>
      )}
    </Box>
  );
};

export default withStyles(styles)(Portrait);
