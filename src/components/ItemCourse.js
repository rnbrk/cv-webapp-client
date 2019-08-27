import React from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import TitleItem from './TitleItem';
import Dot from './Dot';

const styles = {
  totalItem: {
    marginTop: 32,
    marginBottom: 32
  },
  textPart: {
    paddingLeft: 32
  }
};

const ItemCourse = ({ classes, course }) => (
  <article className={classes.totalItem}>
    <Grid container alignItems="stretch">
      <Dot />
      <Grid item xs={10} className={classes.textPart}>
        <TitleItem title={course.name} subtitle={course.instituteName} gutterBottom={false} />
      </Grid>
    </Grid>
  </article>
);

export default withStyles(styles)(ItemCourse);
