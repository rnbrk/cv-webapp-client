import React from 'react';
import moment from 'moment';

import { Box, Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  timeline: {
    position: 'relative',
    width: 2,
    height: '100%',
    backgroundColor: '#2196F3',
    '&::before': {
      content: '""',
      display: 'block',
      width: 8,
      height: 8,
      backgroundColor: 'white',
      border: '2px solid #2196F3',
      borderRadius: '50%',
      position: 'absolute',
      left: '50%',
      top: '0%',
      transform: 'translate(-50%, -50%)'
    },
    '&::after': {
      content: '""',
      display: 'block',
      width: 8,
      height: 8,
      backgroundColor: 'white',
      border: '2px solid #2196F3',
      borderRadius: '50%',
      position: 'absolute',
      left: '50%',
      top: '100%',
      transform: 'translate(-50%, -50%)'
    }
  },
  timelineTextTop: {
    color: '#444444',
    textAlign: 'right',
    whiteSpace: 'nowrap',
    position: 'absolute',
    left: '50%',
    top: '0%',
    transform: 'translate(-110%, -50%)'
  },
  timelineTextBottom: {
    color: '#444444',
    textAlign: 'right',
    whiteSpace: 'nowrap',
    position: 'absolute',
    left: '50%',
    top: '100%',
    transform: 'translate(-110%, -50%)'
  }
};

const Timeline = ({ startDate, endDate, classes }) => (
  <Grid item xs={2} container justify="flex-end" alignItems="center">
    <Box className={classes.timeline}>
      <Typography variant="body2" align="right" className={classes.timelineTextTop}>
        {moment(endDate).format('MMMM YYYY')}
      </Typography>

      <Typography variant="body2" align="right" className={classes.timelineTextBottom}>
        {moment(startDate).format('MMMM YYYY')}
      </Typography>
    </Box>
  </Grid>
);

export default withStyles(styles)(Timeline);
