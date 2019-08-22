import React from 'react';
import { Grid, Link, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  infoBar: {
    marginBottom: 32
  },
  infoIcon: {
    marginRight: 8
  }
};

const ContactDetail = ({ classes, text, Icon, href }) => (
  <Grid item container xs direction="row" justify="center" alignItems="center">
    <Icon color="primary" className={classes.infoIcon} />

    {href ? (
      <Link variant="body1" color="primary" href={href} rel="noopener">
        {text}
      </Link>
    ) : (
      <Typography variant="body1">{text}</Typography>
    )}
  </Grid>
);

export default withStyles(styles)(ContactDetail);
