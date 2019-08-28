import React from 'react';
import uuid from 'uuid';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Check from '@material-ui/icons/Check';
import { withStyles } from '@material-ui/core/styles';

import TitleItem from './TitleItem';
import Timeline from './Timeline';

const styles = {
  jobItem: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 32
  }
};

const ItemJob = ({ job, classes, timelineStyles }) => (
  <article>
    <Grid container alignItems="stretch">
      <Timeline startDate={job.startDate} endDate={job.endDate} {...timelineStyles} />
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
