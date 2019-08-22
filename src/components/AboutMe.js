import React from 'react';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  aboutme: {
    margin: '0 auto',
    marginTop: 32,
    borderTop: '1px solid #999999',
    paddingTop: 16,
    width: '70%'
  }
};

const AboutMe = ({ classes, paragraph }) => (
  <Typography variant="body1" align="center" className={classes.aboutme} gutterBottom>
    {paragraph}
  </Typography>
);

export default withStyles(styles)(AboutMe);
