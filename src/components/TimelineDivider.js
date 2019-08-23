import React from 'react';

import { Box } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  divider: {
    display: 'block',
    position: 'relative',
    width: 3,
    height: props => props.height,
    backgroundColor: '#666666'
  }
};

const TimelineDivider = ({ classes }) => <Box className={classes.divider} />;

export default withStyles(styles)(TimelineDivider);
