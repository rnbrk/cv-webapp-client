import React from 'react';
import uuid from 'uuid';

import { Grid, List, ListItem, ListItemText, Divider, Typography } from '@material-ui/core';
import { Check } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';

import TitleItem from './TitleItem';
import Timeline from './Timeline';

const styles = {
  jobItem: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 32
  },
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

const ItemJob = ({ job, classes }) => (
  <article>
    <Grid container alignItems="stretch">
      <Timeline startDate={job.startDate} endDate={job.endDate} />
      <Grid item xs={10} className={classes.jobItem}>
        <TitleItem title={job.name} subtitle={job.employerName} />
        <Typography variant="body1" align="left">
          {job.description}
        </Typography>

        <List>
          {job.responsibilities.map(respo => (
            <div key={uuid()}>
              <ListItem>
                <Check color="primary" />
                <ListItemText primary={respo} />
              </ListItem>
            </div>
          ))}
        </List>
      </Grid>
    </Grid>
  </article>
);

export default withStyles(styles)(ItemJob);
