import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
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
  },
  default: {
    display: 'block',
    margin: '0 auto',
    marginBottom: 16,
    fontSize: 120
  }
};

const Portrait = ({ classes, name, title, photo }) => (
  <Box className={classes.portrait}>
    {photo ? (
      <Avatar alt="My photo" src={photo} className={classes.photo} />
    ) : (
      <AccountCircle className={classes.default} color="primary" />
    )}

    {name && (
      <Typography variant="h1" align="center">
        {name}
      </Typography>
    )}

    {title && (
      <Typography variant="subtitle1" align="center" color="primary" gutterBottom>
        {title}
      </Typography>
    )}
  </Box>
);

export default withStyles(styles)(Portrait);
