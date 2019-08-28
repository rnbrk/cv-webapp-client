import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import TitleItem from './TitleItem';
import Timeline from './Timeline';

const styles = {
  totalItem: {
    marginTop: 32,
    marginBottom: 32
  },
  textPart: {
    paddingLeft: 32
  }
};

const ItemStudy = ({ classes, study }) => (
  <article className={classes.totalItem}>
    <Grid container alignItems="stretch">
      <Timeline
        startDate={study.startDate}
        endDate={study.endDate}
        topStyle="unconnected"
        bottomStyle="unconnected"
        dateFormat="YYYY"
      />
      <Grid item xs={10} className={classes.textPart}>
        <TitleItem
          title={`${study.title} ${study.name}`}
          subtitle={study.instituteName}
          gutterBottom={false}
        />
      </Grid>
    </Grid>
  </article>
);

export default withStyles(styles)(ItemStudy);
