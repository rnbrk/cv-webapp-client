import React, { useRef } from 'react';
import moment from 'moment';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import { dotMixin, moveUpMixin, centerMixin } from '../styles/mixins';
import TimelineDivider from './TimelineDivider';

const DIVIDER_HEIGHT = 7;

const styles = {
  timelineGrid: {
    paddingLeft: 64
  },
  timeline: {
    position: 'relative',
    width: 3,
    height: props => {
      let height = 100;

      if (props.topStyle === 'unconnected' || props.topStyle === 'divider') {
        height -= DIVIDER_HEIGHT;
      }
      if (props.bottomStyle === 'unconnected' || props.bottomStyle === 'divider') {
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
    transform: 'translate(-100%, -50%)',
    left: '100%',
    paddingRight: 12
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
  topStyle = 'connected',
  bottomStyle = 'connected',
  dateFormat = 'MMMM YYYY'
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
    {topStyle == 'divider' && <TimelineDivider height={`${DIVIDER_HEIGHT}%`} />}

    <Box className={classes.timeline}>
      {!omitEndDate && (
        <Typography
          variant="body2"
          align="right"
          className={`${classes.timelineText} ${classes.timelineTextTop}`}
        >
          {moment(endDate).format(dateFormat)}
        </Typography>
      )}

      {!omitStartDate && (
        <Typography
          variant="body2"
          align="right"
          className={`${classes.timelineText} ${classes.timelineTextBottom}`}
        >
          {moment(startDate).format(dateFormat)}
        </Typography>
      )}
    </Box>

    {bottomStyle === 'divider' && <TimelineDivider height={`${DIVIDER_HEIGHT}%`} />}
  </Grid>
);

export default withStyles(styles)(Timeline);
