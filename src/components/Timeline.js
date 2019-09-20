import React, { useContext, useState, useEffect } from 'react';
import moment from 'moment';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import EditableDate from '../components/EditableDate';
import EditModeContext from '../contexts/editMode';

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
    width: '150px',
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
  dateFormat = 'MMMM YYYY',
  setUpdates
}) => {
  const [editMode] = useContext(EditModeContext);
  const [state, setState] = useState({ startDate, endDate });

  const setDate = type => date => {
    const newState = { ...state, [type]: date.toISOString() };
    setState(newState);
    setUpdates(newState);
  };

  const setEndDate = setDate('endDate');
  const setStartDate = setDate('startDate');

  return (
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
            component="span"
            className={`${classes.timelineText} ${classes.timelineTextTop}`}
          >
            <EditableDate
              initialDate={endDate}
              disabled={!editMode}
              format={dateFormat}
              submitCallback={setEndDate}
            />
          </Typography>
        )}

        {!omitStartDate && (
          <Typography
            variant="body2"
            align="right"
            component="span"
            className={`${classes.timelineText} ${classes.timelineTextBottom}`}
          >
            <EditableDate
              initialDate={startDate}
              disabled={!editMode}
              format={dateFormat}
              submitCallback={setStartDate}
            />
          </Typography>
        )}
      </Box>

      {bottomStyle === 'divider' && <TimelineDivider height={`${DIVIDER_HEIGHT}%`} />}
    </Grid>
  );
};

export default withStyles(styles)(Timeline);
