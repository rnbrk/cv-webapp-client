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

const Portrait = props => (
  <Box className={props.classes.portrait}>
    <Avatar alt="My photo" src="/img/profile_photo.jpg" className={props.classes.photo} />
    <Typography variant="h1" align="center">
      Ron Broek
    </Typography>
    <Typography variant="subtitle1" align="center" color="primary" gutterBottom>
      Webdeveloper
    </Typography>
  </Box>
);

export default withStyles(styles)(Portrait);
