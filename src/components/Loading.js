import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  center: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  }
};

const Loading = ({ classes }) => (
  <Grid container justify="center" height="vh" width="vw" className={classes.center}>
    <CircularProgress color="secondary" size={80} />
  </Grid>
);

export default withStyles(styles)(Loading);
