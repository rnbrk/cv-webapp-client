import React from 'react';
import moment from 'moment';

import { Box, Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { dotMixin, moveUpMixin, centerMixin } from '../styles/mixins';
import TimelineDivider from './TimelineDivider';

const DIVIDER_HEIGHT = 5;

const styles = {
  timelineGrid: {
    paddingLeft: 64
  },
  timeline: {
    position: 'relative',
    width: 3,
    height: props => {
      let height = 100;

      if (props.topDivider) {
        height -= DIVIDER_HEIGHT;
      }
      if (props.bottomDivider) {
        height -= DIVIDER_HEIGHT;
      }

      return `${height}%`;
    },
    backgroundColor: '#2196F3',

    // The dots on the top and bottom of the timeline
    '&::before': {
      ...moveUpMixin,
      ...centerMixin,
      ...dotMixin,
      top: '0%'
    },
    '&::after': {
      ...moveUpMixin,
      ...centerMixin,
      ...dotMixin,
      top: '100%'
    }
  },

  // The startDate and endDate text
  timelineText: {
    color: '#444444',
    textAlign: 'right',
    whiteSpace: 'nowrap',
    position: 'absolute',
    left: '50%',
    transform: 'translate(-110%, -50%)'
  },
  timelineTextTop: { top: '0%' },
  timelineTextBottom: { top: '100%' }
};

const Timeline = ({
  startDate,
  endDate,
  classes,
  omitStartDate,
  omitEndDate,
  topDivider,
  bottomDivider
}) => (
  <Grid
    item
    xs={2}
    container
    direction="column"
    justify="flex-end"
    alignItems="center"
    className={classes.timelineGrid}
  >
    {topDivider && <TimelineDivider height={`${DIVIDER_HEIGHT}%`} />}

    <Box className={classes.timeline}>
      {!omitEndDate && (
        <Typography
          variant="body2"
          align="right"
          className={`${classes.timelineText} ${classes.timelineTextTop}`}
        >
          {moment(endDate).format('MMMM YYYY')}
        </Typography>
      )}

      {!omitStartDate && (
        <Typography
          variant="body2"
          align="right"
          className={`${classes.timelineText} ${classes.timelineTextBottom}`}
        >
          {moment(startDate).format('MMMM YYYY')}
        </Typography>
      )}
    </Box>

    {bottomDivider && <TimelineDivider height={`${DIVIDER_HEIGHT}%`} />}
  </Grid>
);

export default withStyles(styles)(Timeline);
