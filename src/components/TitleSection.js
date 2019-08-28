import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  titleSection: {
    marginBottom: 64
  }
};

const TitleSection = ({ classes, title, Icon }) => (
  <Typography variant="h2" align="center" className={classes.titleSection}>
    <Icon color="primary" /> {title}
  </Typography>
);

export default withStyles(styles)(TitleSection);
