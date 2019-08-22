import React from 'react';
import { Avatar, Box, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

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
  }
};

const Portrait = ({ classes, name, title }) => (
  <Box className={classes.portrait}>
    <Avatar alt="My photo" src="/img/profile_photo.jpg" className={classes.photo} />
    <Typography variant="h1" align="center">
      {name}
    </Typography>
    <Typography variant="subtitle1" align="center" color="primary" gutterBottom>
      {title}
    </Typography>
  </Box>
);

export default withStyles(styles)(Portrait);
