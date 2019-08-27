import React from 'react';

import { Box, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { dotMixin, centerMixin } from '../styles/mixins';

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
