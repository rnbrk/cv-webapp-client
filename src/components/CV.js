import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
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
