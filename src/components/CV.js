import React from 'react';
import { Box, Container } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    margin: '0 auto',
    padding: 50
  }
};

const CV = props => (
  <Container maxWidth="md">
    <Box bgcolor="#EEEEEE" className={props.classes.root}>
      {props.children}
    </Box>
  </Container>
);

export default withStyles(styles)(CV);
