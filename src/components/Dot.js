import React from 'react';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import { dotMixin } from '../styles/mixins';

const styles = {
  grid: {
    paddingLeft: 64
  },
  dot: {
    position: 'relative',
    width: 3,
    height: 3,
    ...dotMixin
  }
};

const Dot = ({ classes }) => (
  <Grid
    item
    xs={2}
    container
    direction="column"
    justify="center"
    alignItems="center"
    className={classes.grid}
  >
    <Box className={classes.dot} />
  </Grid>
);

export default withStyles(styles)(Dot);
