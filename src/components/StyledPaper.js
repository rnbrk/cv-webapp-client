import React from 'react';
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  paper: {
    paddingLeft: 64,
    paddingRight: 64,
    paddingTop: 32,
    paddingBottom: 64,
    margin: 16
  }
};

const StyledPaper = props => <Paper className={props.classes.paper}>{props.children}</Paper>;

export default withStyles(styles)(StyledPaper);
